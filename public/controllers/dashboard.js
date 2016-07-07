angular.module('nhs')

.controller('dashboard', ['$scope', "$state", "$rootScope", function($scope, $state, $rootScope){

    $scope.findTotal = function(){
        var total = 0;
        for(var i = 0; i < $rootScope.events.length; i++){
            console.log($rootScope.events[i].hours);
            total += $rootScope.events[i].hours;
        }
        return total;
    };
}])

;
