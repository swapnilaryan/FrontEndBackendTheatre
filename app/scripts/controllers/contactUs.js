/**
 * Created by swapnil on 03/05/18.
 */
'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
    .controller('contactUsController', function ($scope, theatreDetailService) {
        $scope.contactDetails = null;
        $scope.locationDetails = null;
        $scope.socialDetails = null;
        theatreDetailService.contactUs().then(function (response) {
            $scope.contactDetails = response.data.data;
        });
        theatreDetailService.locateUs().then(function (response) {
            $scope.locationDetails = response.data.data;
        });
        theatreDetailService.social().then(function (response) {
            $scope.socialDetails = response.data.data;
            $scope.socialDetails.socialFacebook = $scope.socialDetails.socialFacebook.replace("https://", '');
            $scope.socialDetails.socialTwitter = $scope.socialDetails.socialTwitter.replace("https://", '');
        });
    });
