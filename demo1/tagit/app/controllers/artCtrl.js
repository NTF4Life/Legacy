(function(){

	var artCtrl = function($scope){
		$scope.photos = [];
		
		for (i=1;i<71;i++){
						$scope.photos.push(
				{src: "images/thumb/"+i+'.jpg', desc: 'Image '+i, href:"images/art/"+i+".jpg"});
		
	}
	

	


	}

		




artCtrl.$inject =['$scope'];

	angular.module('tagIt')
		.controller('artCtrl', artCtrl);

}())