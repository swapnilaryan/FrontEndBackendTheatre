'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('MainCtrl', function ($scope) {
      $scope.images = '../images/add_to_cart_button.png';
      $scope.add_to_cart = false;
      $scope.with_cart = false;
      $scope.show_add_to_cart = function(){
          $scope.add_to_cart = true;
          $scope.with_cart = true;
      };
      $scope.hide_add_to_cart = function(){
          $scope.add_to_cart = false;
          $scope.with_cart = false;
      };
  });
