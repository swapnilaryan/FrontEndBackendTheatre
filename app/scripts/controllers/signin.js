'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('SigninCtrl', function ($scope, $rootScope, userLogInStatus, $uibModalInstance, $cookieStore, $uibModal, signin, signout) {
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
    $rootScope.$on("signinWithSignUp", function (event, data) {
      console.log("---------------------",data);
      $scope.register.emailId = data.emailId;
      $scope.register.password = data.password;
      $scope.signinUser();
    });
    $scope.register = {"emailId":"","password": ""};
    $scope.signinUser = function signinUser(){
      $scope.data = {
        "emailId": $scope.register.emailId,
        "password":$scope.register.password
      };
      signin.signin($scope.data).then(function(resolve, reject){
        console.log(resolve);
        console.log(reject);
        if(resolve.Status!="Fail"){
          $scope.userLoggedIn = true;
          $cookieStore.put('userLogin', $scope.register.emailId);
          $rootScope.$broadcast('userLoggedin', $scope.register.emailId);
          $scope.cancel();
        }else{
          $scope.userLoggedIn = false;
        }
        console.log($cookieStore.get('userLogin'));
      });
    }
  });
