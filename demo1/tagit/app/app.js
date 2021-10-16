 (function(){
 	var app = angular.module('tagIt',['ngRoute','ngAnimate','ngTouch']);




 	app.config(function($routeProvider) {
 		$routeProvider
 			.when('/', {
 				controller:"homeController",
 				templateUrl:'app/views/home.html'
 			})
 			.when('/projects/', {
 				controller:"",
 				templateUrl:'app/views/projects.html'
 			})
 			.when('/gallery/', {
 				controller:"artCtrl",
 				templateUrl:'app/views/art.html'
 			})
 			.when('/music/', {
 				controller:"",
 				templateUrl:'app/views/music.html'
 			})
 			.when('/about/', {
 				controller:"",
 				templateUrl:'app/views/about.html'
 			})
 			.when('/art/', {
 				controller:"artCtrl",
 				templateUrl:'app/views/gallery.html'
 			})
 			.otherwise({redirectTo:'/'})
 	});

 }());