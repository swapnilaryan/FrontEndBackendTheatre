'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('SignupCtrl', function ($scope, $uibModalInstance, $uibModal) {
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    $scope.openSignIn = function (size) {
      $scope.cancel();
      var modalInstance = $uibModal.open({
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl',
        size: size
      });
    };
  });
