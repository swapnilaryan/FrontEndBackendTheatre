'use strict';

/**
 * @ngdoc directive
 * @name backendTheatreApp.directive:addToCart
 * @description
 * # addToCart
 */
angular.module('backendTheatreApp')
  .directive('addToCart', function (apiKey) {
    var imagePath = config.imagePath;
    return {
      //template: '<div></div>',
      restrict: 'E',
      template:
                    '<a ng-href=\'#/moviedetails\'>' +
                        '<img ng-src="'+imagePath+'/images/add_to_cart_button.png" class="align_add_to_cart"  >' +
                    '</a>'

    };
  })
  .directive('starRating', function () {
  return {
    scope: {
      rating: '=',
      maxRating: '@',
      readOnly: '@',
      click: "&",
      mouseHover: "&",
      mouseLeave: "&"
    },
    restrict: 'EA',
    template:
      "<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> <img ng-src='{{((hoverValue + _rating) <= $index) && \"http://www.codeproject.com/script/ratings/images/star-empty-lg.png\" || \"http://www.codeproject.com/script/ratings/images/star-fill-lg.png\"}}'ng-Click='isolatedClick($index + 1)'ng-mouseenter='isolatedMouseHover($index + 1)'ng-mouseleave='isolatedMouseLeave($index + 1)'></img> </div>",
    compile: function (element, attrs) {
      if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
        attrs.maxRating = '5';
      };
    },
    controller: function ($scope, $element, $attrs) {
      $scope.maxRatings = [];

      for (var i = 1; i <= $scope.maxRating; i++) {
        $scope.maxRatings.push({});
      };

      $scope._rating = $scope.rating;

      $scope.isolatedClick = function (param) {
        if ($scope.readOnly == 'true') return;

        $scope.rating = $scope._rating = param;
        $scope.hoverValue = 0;
        $scope.click({
          param: param
        });
      };

      $scope.isolatedMouseHover = function (param) {
        if ($scope.readOnly == 'true') return;

        $scope._rating = 0;
        $scope.hoverValue = param;
        $scope.mouseHover({
          param: param
        });
      };

      $scope.isolatedMouseLeave = function (param) {
        if ($scope.readOnly == 'true') return;

        $scope._rating = $scope.rating;
        $scope.hoverValue = 0;
        $scope.mouseLeave({
          param: param
        });
      };
    }
  };
});
//"<div>" +
// "</div>"
