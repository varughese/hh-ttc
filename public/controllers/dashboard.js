angular.module('nhs')

.controller('dashboard', ['$scope', "$state", "$rootScope", "Event", "UpcomingEvent", function($scope, $state, $rootScope, Event, UpcomingEvent){
    $scope.events = [];

    Event.all()
        .then(function(events) {
            $scope.events = events;
        });

    UpcomingEvent.all()
        .then(function(upcoming) {
            $scope.upcoming = upcoming;
            console.log(upcoming);
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
