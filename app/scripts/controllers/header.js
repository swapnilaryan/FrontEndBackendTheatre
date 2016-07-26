'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('HeaderCtrl', function ($scope, $cookieStore, $rootScope, userLogInStatus, $uibModal, signout) {
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
    $rootScope.$on("userLoggedin", function (event, data) {
        $scope.showUser = true;
        $scope.loginRegister = false;
        $scope.userDetails = $cookieStore.get('userLogin');
      console.log("---------------------",data, $scope.userDetails);
    });
    $scope.showUser = false;
    $scope.userDetails = $cookieStore.get('userLogin');
    if($scope.userDetails!=null || $scope.userDetails != undefined){
      $scope.showUser = true;
      $scope.loginRegister = false;
    }else{
      $scope.showUser = false;
      $scope.loginRegister = true;
    }
    $scope.logout = function logout(){
      signout.signout().then(function(response){
        console.log(response);
        $scope.showUser = false;
        $scope.loginRegister = true;
        $cookieStore.remove('userLogin');
        // console.log($cookieStore.get('userLogin'));
      });
    }
  });
