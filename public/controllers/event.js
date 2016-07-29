angular.module('nhs')

.controller('eventCreate', ['$scope', "$state", "$rootScope", "Event", function($scope, $state, $rootScope, Event){
    $scope.saveEvent = function(){
        Event.create($scope.eventData)
            .then(function() {
                $state.go("dashboard");
            });
    };

    $scope.setUEvent = function setUpcomingEvent(uevent) {
        $scope.eventData.date = uevent.date;
    };

}])

.controller('eventEdit', ['$scope', "$state", "$rootScope", '$stateParams', 'Event', function($scope, $state, $rootScope, $stateParams, Event){
    var eventID = $stateParams.eventID;
    var pos = 0;

    Event.get(eventID)
        .then(function(event) {
            $scope.eventData = event;
        });

    $scope.saveEvent = function(){
        Event.update(eventID, $scope.eventData)
            .then(function() {
                $state.go("dashboard");
            });


    };

    $scope.setUEvent = function setUpcomingEvent(uevent) {
        $scope.eventData.date = uevent.date;
    };

}])

;
