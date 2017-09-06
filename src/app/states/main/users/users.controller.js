(function() {
	'use strict';

	angular
		.module('wud.techtest')
		.controller('UsersController', UsersController);

  /** @ngInject */
	function UsersController($scope, globalRESTService, $log) {

		var vm = this;
		vm.usersData = {
			usersList	: [],
			newUser		: {},
			succeed		: true,
			addNewUser	: function() {
				globalRESTService.executeQuery('POST', '/user', vm.usersData.newUser)
				.then(
					function success() {
						$log.log("Added new user to the list!");
						vm.usersData.getUsersList();
						vm.usersData.newUser = {};
					},
					function error(response) {
						alert('Adding new user failed!');
						$log.error(response);
					}
				);
			},
			getUsersList: function() {
				globalRESTService.executeQuery('GET', '/users')
				.then(
					function success(response) {
						vm.usersData.usersList = response.data;
						vm.usersData.succeed = true;
					},
					function error(response) {
						$log.error("Failed to get users data!",response);
						vm.usersData.succeed = false;

					}
				);
			}
		};
		vm.usersData.getUsersList();
	}	
})();
