(function() {
	'use strict';

	angular
		.module('wud.techtest')
		.service('globalRESTService', globalRestService);

	/** @ngInject */
	function globalRestService($http) {

		var apiEndpointData = {
			url: 'http://localhost:8000'
		};

		var Service = {
			executeQuery: function(method, urlSuffix, dataToSend) {
				var httpObject = {
					method: method,
					url: apiEndpointData.url+urlSuffix
				};
				if(dataToSend !== null && angular.isDefined(dataToSend)) {
					httpObject.data = dataToSend;
				}
				return $http(httpObject);
			}
		};

		return Service;
	}
})();