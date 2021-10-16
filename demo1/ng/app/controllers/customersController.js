(function(){
	var CustomersController = function($scope){
		$scope.sortBy = 'name';
		$scope.reverse =false;

		$scope.doSort - function (propName){
			$scope.sortBy = propName;
			$scope.reverse = !$scope.reverse;
		};
		$scope.customers=[
		{
			id:1,
			joined:'2003-12-02',
			name:'Daniil',
			city:'Chandler',
			orderTotal:9.9956,
			orders: [
				{
					id:1,
					product:'shoes',
					total:9.9956
				}
			]
		},
		{
			id:2,
			joined:'2002-12-02',
			name:'Oleg',
			city:'New York',
			orderTotal:19.99,
			orders: [
				{
					id:2,
					product:'baseball',
					total:9.995
				},
				{
					id:3,
					product:'bat',
					total:9.995
				}
			]
		},
		{
			id:3,
			joined:'2004-12-02',
			name:'Garbriel',
			city:'New Jersey',
			orderTotal:19.99,
			orders: [
				{
					id:4,
					product:'hat',
					total:19.99
				}
			]
		}
		];
	};
	CustomersController.$inject =['$scope'];

	angular.module('customersApp')
		.controller('CustomersController', CustomersController)
}());