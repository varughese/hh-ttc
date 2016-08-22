angular.module('nhs')

.controller('dashboard', ['$scope', "$state", "$rootScope", "Event", "UpcomingEvent", "$timeout", function($scope, $state, $rootScope, Event, UpcomingEvent, $timeout){
    $scope.events = [];

    var watcher = $rootScope.$watch("user", function(n, o, s) {
        if(n && n.id) {
            Event.all()
                .then(function(events) {
                    $scope.events = events.reverse();
                });
            watcher();
        }
    });


    UpcomingEvent.all()
        .then(function(upcoming) {
            $rootScope.upcoming = upcoming;
        });

    $scope.findTotal = function() {
        var total = 0;
        for(var i = 0; i < $scope.events.length; i++){
            total += $scope.events[i].hours;
        }
        return total;
    };
}])

;
