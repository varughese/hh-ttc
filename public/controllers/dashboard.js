angular.module('nhs')

.controller('dashboard', ['$scope', "$state", "$rootScope", function($scope, $state, $rootScope){
    $scope.events = [
        {
            _id: 1,
            name: "Special Olympics",
            date: "5/29/2016",
            hours: 10,
            checked: false 
        },
        {
            _id: 2,
            name: "Blood Drive",
            date: "5/16/2015",
            hours: 3,
            checked: false 
        },
    ];
}])

;
