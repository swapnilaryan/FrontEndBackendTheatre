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
      $scope.movieComingSoon = [
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
          }//,
          //{
          //    'image':'../images/cs3.png',
          //    'date': '16',
          //    'month': 'June'
          //},
          //{
          //    'image':'../images/cs3.png',
          //    'date': '16',
          //    'month': 'June'
          //},
          //{
          //    'image':'../images/cs2.png',
          //    'date': '16',
          //    'month': 'June'
          //}
      ];
      $scope.movieNowShowing=[
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
              'image': '../images/img1.png',
              'list_show_none': ['1:35 pm', '4:00 pm', '6:35 pm', '9:15 pm']
          }//,
          //{
          //    'image':'../images/img1.png',
          //    'list_show_none':['1:35 pm','4:00 pm','6:35 pm','9:15 pm']
          //},
          //{
          //    'image':'../images/img1.png',
          //    'list_show_none':['1:35 pm','4:00 pm','6:35 pm','9:15 pm']
          //}
      ];
      //$scope.list_show_none = ['1:35 pm','4:00 pm','6:35 pm','9:15 pm'];
      //$scope.list_now_showing = [
      //    {'image':'../images/img1.png'},
      //    {'image':'../images/img2.png'},
      //    {'image':'../images/img3.png'},
      //    {'image':'../images/img1.png'}
      //];
  });
