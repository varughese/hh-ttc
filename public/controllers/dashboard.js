angular.module('nhs')

.controller('dashboard', ['$scope', "$state", "$rootScope", "Event", function($scope, $state, $rootScope, Event){
    Event.all()
        .then(function(events) {
            $scope.events = events;
            $scope.totalHours = findTotal();
        });

    $scope.removeEvent = function(eventID, i){
        $rootScope.events.splice(i,1);
    };

    function findTotal() {
        var total = 0;
        for(var i = 0; i < $scope.events.length; i++){
            total += $scope.events[i].hours;
        }
        return total;
    }
}])

;
