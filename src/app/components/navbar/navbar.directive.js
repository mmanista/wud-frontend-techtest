(function() {
  'use strict';

  angular
    .module('wud.techtest')
    .directive('wudNavbar', wudNavbar);

  /** @ngInject */
  function wudNavbar() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: function($scope, $state) {

        // set navbar tab for every defined route that has a defined template
        $scope.navbarTabs = $state.get().filter(function(obj) {
          return angular.isDefined(obj.templateUrl) || angular.isDefined(obj.template);
        });
      }
    };
  }
})();
