'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($http) {

  const baseApiUrl = "https://madera-configuration-ms-api.herokuapp.com/blocs";
  let vm = this;
  vm.blocList = [];

    $http.get(baseApiUrl).then((resp) => {
        vm.blocList = resp.data;
    }, () => {
        vm.showErrorNotification = true;
    });


});