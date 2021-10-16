(function(){

	var homeController = function($scope){
		$scope.locations =[];			
	}

	homeController.$inject =['$scope'];

	angular.module('tagIt')
		.controller('homeController', homeController);
}());