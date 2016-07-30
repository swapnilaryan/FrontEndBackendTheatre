'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('HeaderCtrl', function ($scope, $timeout, $cookieStore, $rootScope, userLogInStatus, $uibModal, signout
                                      ,Idle) {
    $scope.showUser = false;
    $scope.userDetails = $cookieStore.get('userLogin');
    console.log("-------in side header js",$scope.userDetails);
    $rootScope.$on("userLoggedin", function (event, data) {
        $scope.showUser = true;
        $scope.loginRegister = false;
        $scope.userDetails = $cookieStore.get('userLogin');
        $scope.start();
      console.log("---------------------",data, $scope.userDetails);
    });
    $scope.logout = function logout(){
        signout.signout().then(function(response){
        console.log(response);
        $scope.showUser = false;
        $scope.loginRegister = true;
        $cookieStore.remove('userLogin');
        // console.log($cookieStore.get('userLogin'));
      });
    };
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
     /* Ng Idle */
    $scope.started = false;

    $scope.closeModals = function closeModals() {
      if ($scope.warning) {
        $scope.warning.close();
        $scope.warning = null;
      }

      if ($scope.timedout) {
        $scope.timedout.close();
        $scope.timedout = null;
      }
    };

    $scope.$on('IdleStart', function() {
      $scope.closeModals();

      $scope.warning = $uibModal.open({
        templateUrl: 'views/warning-dialog.html',
        windowClass: 'modal-danger'
      });
    });

    $scope.$on('IdleEnd', function() {
      $scope.closeModals();
    });

    $scope.$on('IdleTimeout', function() {
      $scope.closeModals();
      $scope.timedout = $uibModal.open({
        templateUrl: 'views/timedout-dialog.html',
        windowClass: 'modal-danger'
      });
      $scope.stop();
    });

    $scope.start = function() {
      $scope.closeModals();
      Idle.watch();
      $scope.started = true;
    };

    $scope.stop = function() {
      $scope.closeModals();
      Idle.unwatch();
      $scope.started = false;
      $scope.logout();
    };
     /*End ng Idle*/

    if($scope.userDetails!=null || $scope.userDetails != undefined){
      $scope.showUser = true;
      $scope.loginRegister = false;
      $scope.start();
    }else{
      $scope.showUser = false;
      $scope.loginRegister = true;
    }
  });
