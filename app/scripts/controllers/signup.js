'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('SignupCtrl', function ($scope, $rootScope, $uibModalInstance, $uibModal, signup) {
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
    // $scope.register = {
    //   "firstname":"",
    //   "lastName":"",
    //   "emailId":"",
    //   "password":"",
    //   "confirm_password":""
    // };
    $scope.registerUser = function registerUser(){
      $scope.data = {
        "firstName": $scope.register.firstName,
        "lastName":$scope.register.lastName,
        "emailId": $scope.register.emailId,
        "password":$scope.register.password,
        "confirm_password":$scope.register.confirm_password
      };
      signup.registration($scope.data).then(function(resolve, reject){
        console.log(resolve);
        console.log(reject);
        if(resolve.Status!="Fail"){
          $rootScope.$broadcast('signinWithSignUp', $scope.data);
          $scope.cancel();
        }
      });
    };
  });
