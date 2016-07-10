angular.module('nhs')

.controller('dashboard', ['$scope', "$state", "$rootScope", "Event", function($scope, $state, $rootScope, Event){
    $scope.events = [];

    Event.all()
        .then(function(events) {
            $scope.events = events;
        });

    $scope.removeEvent = function(eventID, i){
        Event.delete(eventID)
            .then(function() {
                $scope.events.splice(i, 1); // simulate a reload
            });
    };

    $scope.findTotal = function() {
        var total = 0;
        for(var i = 0; i < $scope.events.length; i++){
            total += $scope.events[i].hours;
        }
        return total;
    };
}])

;
