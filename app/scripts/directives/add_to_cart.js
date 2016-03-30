'use strict';

/**
 * @ngdoc directive
 * @name backendTheatreApp.directive:addToCart
 * @description
 * # addToCart
 */
angular.module('backendTheatreApp')
  .directive('addToCart', function () {
    return {
      //template: '<div></div>',
      restrict: 'E',
      template:
                    "<a ng-href='#'>" +
                        "<img src=\"../images/add_to_cart_button.png\" class=\"align_add_to_cart\"  >" +
                    "</a>"

    };
  });
//"<div>" +
// "</div>"