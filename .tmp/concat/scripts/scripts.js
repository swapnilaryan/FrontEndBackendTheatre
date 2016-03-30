'use strict';

/**
 * @ngdoc overview
 * @name backendTheatreApp
 * @description
 * # backendTheatreApp
 *
 * Main module of the application.
 */
angular
  .module('backendTheatreApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('MainCtrl', ["$scope", function ($scope) {
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
      $scope.movie_coming_soon = [
          {
              'image':'../images/cs2png',
              'date': '16',
              'month': 'June'
          },
          {
              'image':'../images/cs3.png',
              'date': '16',
              'month': 'June'
          },
          {
              'image':'../images/cs4.png',
              'date': '16',
              'month': 'June'
          },
          {
              'image':'../images/cs4.png',
              'date': '16',
              'month': 'June'
          },
          {
              'image':'../images/cs2.png',
              'date': '16',
              'month': 'June'
          },
          {
              'image':'../images/cs3.png',
              'date': '16',
              'month': 'June'
          },
          {
              'image':'../images/cs3.png',
              'date': '16',
              'month': 'June'
          },
          {
              'image':'../images/cs2.png',
              'date': '16',
              'month': 'June'
          }
      ];
      $scope.movie_now_showing=[
          {
              'image':'../images/img1.png',
              'list_show_none':['1:35 pm','4:00 pm','6:35 pm','9:15 pm'],
          },
          {
              'image':'../images/img2.png',
              'list_show_3d':['6:30 pm'],
              'list_show_3d_image':'../images/3d_text.png',
              'list_show_2d':['6:00 pm','6:15 pm'],
              'list_show_2d_image':'../images/2d_text.png'
          },
          {
              'image':'../images/img3.png',
              'list_show_3d':['1:05 pm','3:55 pm','6:40 pm','9:20 pm'],
              'list_show_3d_image':'../images/3d_text.png',
              'list_show_2d':['12:50 pm','3:40 pm','6:30 pm','9:10 pm'],
              'list_show_2d_image':'../images/2d_text.png'
          },
          {
              'image':'../images/img1.png',
              'list_show_none':['1:35 pm','4:00 pm','6:35 pm','9:15 pm']
          },
          {
              'image':'../images/img1.png',
              'list_show_none':['1:35 pm','4:00 pm','6:35 pm','9:15 pm']
          },
          {
              'image':'../images/img1.png',
              'list_show_none':['1:35 pm','4:00 pm','6:35 pm','9:15 pm']
          }
      ];
      //$scope.list_show_none = ['1:35 pm','4:00 pm','6:35 pm','9:15 pm'];
      //$scope.list_now_showing = [
      //    {'image':'../images/img1.png'},
      //    {'image':'../images/img2.png'},
      //    {'image':'../images/img3.png'},
      //    {'image':'../images/img1.png'}
      //];
  }]);

'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

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
angular.module('backendTheatreApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"row&quot;\" ng-controller=\"MainCtrl\"> <div class=\"col-md-12\" id=\"main_view\"> <div class=\"row\"> <div class=\"container\"> <div class=\"col-md-1\" id=\"top-angle-left\"> <p><a ng-href=\"\"><i class=\"fa fa-angle-left fa-3x\"></i></a></p> </div> <div class=\"col-md-10\"> <!--<h1><img src=\"../images/Now_Showing.png\"></h1>--> <div class=\"col-md-4\" id=\"left_banner_now_showing\"></div> <div class=\"col-md-4\" id=\"now_showing_text\">NOW SHOWING</div> <div class=\"col-md-4\" id=\"right_banner_now_showing\"></div> </div> <div class=\"col-md-1\" id=\"top-angle-right\"> <p><i class=\"fa fa-angle-right fa-3x\"></i></p> </div> </div> <div class=\"container\" id=\"show_list\"> <div class=\"col-md-6 list_now_showing\" ng-repeat=\"mvs in movie_now_showing\"> <div class=\"wrap_all\"> <!--<img class=\"images\" src=\"../images/img1.png\">--> <img class=\"images\" ng-src=\"{{mvs.image}}\"> <div class=\"all_timings\"> <div class=\"list-show-none\"> <span ng-repeat=\"list_show in mvs.list_show_none\">{{list_show}}</span> </div> <div class=\"list-show-3d\"> <span><img ng-src=\"{{mvs.list_show_3d_image}}\"> </span> <span ng-repeat=\"list_show in mvs.list_show_3d\">{{list_show}}</span> </div> <div class=\"list-show-2d\"> <!--<img ng-src=\"\">--> <span><img ng-src=\"{{mvs.list_show_2d_image}}\"></span> <span ng-repeat=\"list_show in mvs.list_show_2d\">{{list_show}}</span> </div> </div> <add-to-cart class=\"align_add_to_cart show-cart\"></add-to-cart> </div> </div> </div> </div> <div class=\"row\"> <div class=\"container coming-soon\"> <div class=\"col-md-12\"> <div class=\"col-md-5\" id=\"bottom-angle-left\"> <p><i class=\"fa fa-angle-left fa-3x\"></i></p> </div> <div class=\"col-md-2\"> <h1 id=\"coming_soon_text\">Coming Soon</h1> </div> <div class=\"col-md-5\" id=\"bottom-angle-right\"> <p><i class=\"fa fa-angle-right fa-3x\"></i></p> </div> </div> </div> <div class=\"container\" id=\"coming-soon\"> <div class=\"col-md-3\" id=\"list_coming_soon\" ng-repeat=\"mcs in movie_coming_soon\"> <div class=\"parent\"> <div class=\"imagewrap\"> <div class=\"date_month\"> <h1 class=\"coming_soon_date\">{{mcs.date}}</h1> <h1 class=\"coming_soon_month\">{{mcs.month}}</h1> </div> <img class=\"coming_soon_circle\" src=\"../images/circle.png\"> </div> <img class=\"coming_soon_images\" ng-src=\"{{mcs.image}}\"> </div> <!--<li>--> <!--<div class=\"parent\">--> <!--<div class=\"imagewrap\">--> <!--<div class=\"date_month\">--> <!--<h1 class=\"coming_soon_date\">23</h1>--> <!--<h1 class=\"coming_soon_month\">September</h1>--> <!--</div>--> <!--<img class=\"coming_soon_circle\" src=\"../images/circle.png\">--> <!--</div>--> <!--<img class=\"coming_soon_images\" src=\"../images/cs3.png\">--> <!--</div>--> <!--</li>--> <!--<li>--> <!--<div class=\"parent\">--> <!--<div class=\"imagewrap\">--> <!--<div class=\"date_month\">--> <!--<h1 class=\"coming_soon_date\">21</h1>--> <!--<h1 class=\"coming_soon_month\">June</h1>--> <!--</div>--> <!--<img class=\"coming_soon_circle\" src=\"../images/circle.png\">--> <!--</div>--> <!--<img class=\"coming_soon_images\" src=\"../images/cs4.png\">--> <!--</div>--> <!--</li>--> <!--<li>--> <!--<div class=\"parent\">--> <!--<div class=\"imagewrap\">--> <!--<div class=\"date_month\">--> <!--<h1 class=\"coming_soon_date\">14</h1>--> <!--<h1 class=\"coming_soon_month\">April</h1>--> <!--</div>--> <!--<img class=\"coming_soon_circle\" src=\"../images/circle.png\">--> <!--</div>--> <!--<img class=\"coming_soon_images\" src=\"../images/cs5.png\">--> <!--</div>--> <!--</li>--> </div> </div> </div> </div> </div>"
  );

}]);
