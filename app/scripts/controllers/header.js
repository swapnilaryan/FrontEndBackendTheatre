'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('HeaderCtrl', function ($scope, $uibModal) {
    $scope.openSignIn = function (size) {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl',
        size: size
      });
    };
    $scope.openSignUp = function (size) {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        size: size
      });
    };
  });
