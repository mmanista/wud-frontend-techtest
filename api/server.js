var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs');

var app = express();
app.use(bodyParser.json());

app.all('*', function(req, res,next) {


    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type, Authorization, Content-Length, X-Requested-With",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  req.headers.origin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }


});

var cache;

function read() {
  return JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf8'));
}

function write() {
  fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(cache));
}

app.listen(8000);

app.get('/users', function(req, res) {
  console.log('GET /users');
  cache = read();
  res.json(cache.users);
});

app.post('/user', function(req, res) {
  cache = read();
  console.log('POST /user');
  console.log(req.body);
  var user = req.body;
  var validation = {
    firstname: "string",
    lastname: "string",
    email: "string"
  };
  for (var field in validation) {
    var type = typeof user[field];
    if (!user.hasOwnProperty(field)) {
      res.status(400);
      res.send(`Field '${field}' is required`);
      return;
    }
    else if (type !== validation[field]) {
      res.status(400);
      res.send(`Field '${field}' must be of type '${validation[field]}'.`);
      return;
    }
  }
  user.id = cache.users.length;
  cache.users.push({
    id: cache.users.length,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email
  });
  write();

  res.status(200);
  res.send();
});




