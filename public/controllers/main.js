angular.module('nhs')

.run(function ($state,$rootScope) {
    $rootScope.state = $state;
})

.controller('main', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state){
    $scope.getState = function() {
        return $state.current.name;
    };
    var events = [
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

    $rootScope.events = events;
}]);
