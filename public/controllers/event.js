angular.module('nhs')

.controller('eventCreate', ['$scope', "$state", "$rootScope", "Event", function($scope, $state, $rootScope, Event){
    $scope.saveEvent = function(){
        Event.create($scope.eventData)
            .then(function() {
                $state.go("dashboard");
            });
    };
}])

.controller('eventEdit', ['$scope', "$state", "$rootScope", '$stateParams', 'Event', function($scope, $state, $rootScope, $stateParams, Event){
    var id = Number($stateParams.eventID);
    var event = {};
    var pos = 0;

    angular.forEach($rootScope.events, function(e, i) {
        if(e._id === id) {
            $scope.eventData = e;
            pos = i;
        }
    });

    $scope.saveEvent = function(){
        $rootScope.events[pos] = $scope.eventData;
        $state.go("dashboard");
    };
}])

;
