var app = angular.module('instagramSearchApp', ['ngRoute', 'ngResource']);

// var parseRequestHeaders = {
//   'X-Parse-Application-Id': 'cmkFb3fXMq5OlHsY5rESuEIWlwCUQCijX6fABJmG',
//   'X-Parse-REST-API-Key': 'rS3Jt4LkAaokGDWa29cfm2fRiHZLDnm5J5wuqikn'
// };

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/search.html',
      controller: 'SearchCtrl'
    })
    .when('/favorites', {
      templateUrl: 'templates/favorites.html',
      controller: 'FavoritesCtrl'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);

app.factory('Photo', ['$resource', function($resource) {
  return $resource('/api/photos/:id', {photoId: '@_id'},
     {
      query: {
        method: 'GET'
        // isArray: false,
        // headers: parseRequestHeaders
      },
      save: {
        method: 'POST'
        // headers: parseRequestHeaders
      }
     });
}]);

app.controller('SearchCtrl', ['$scope', '$http', 'Photo', function($scope, $http, Photo) {
	$scope.searchCtrlTest = "Hey it's working!";
  $scope.searchTag = function() {
    var tag = $scope.tag;
    var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=d8d0d6b44249490bbde6eee4d1968dac&callback=JSON_CALLBACK';

    $http.jsonp(url)
      .then(function (response) {
        $scope.searchTag = {};
        $scope.photos = response.data.data;
        console.log($scope.photos);
      }, function (error) {

      });
  };
  $scope.savePhoto = function(photo) {
    var photoData ={
      url: photo.images.standard_resolution.url,
      user: photo.user.username,
      likes: photo.likes.count
    };

    Photo.save(photoData, function (data) {
      // success callback
    }, function (error) {
      // error callback
    });
  };
}]);

app.controller('FavoritesCtrl', ['$scope', 'Photo', function($scope, Photo){
  $scope.favorites = [];
  Photo.query(function(data) {
    $scope.favorites = data.photos;
    console.log(data);
  }, function(error) {
    // error callback
  });
	$scope.favoritesCtrlTest = "Hey this is working too!";
}]);