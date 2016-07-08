angular.module('nhs')

.controller('dashboard', ['$scope', "$state", "$rootScope", function($scope, $state, $rootScope){

    $scope.removeEvent = function(eventID, i){
        $rootScope.events.splice(i,1);
    };

    $scope.findTotal = function(){
        var total = 0;
        for(var i = 0; i < $rootScope.events.length; i++){
            total += $rootScope.events[i].hours;
        }
        return total;
    };
}])

;
