'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('SigninCtrl', function ($scope, $uibModalInstance, $uibModal) {
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    $scope.openSignUp = function (size) {
      $scope.cancel();
      var modalInstance = $uibModal.open({
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        size: size
      });
    };
  });
