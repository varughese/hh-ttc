angular.module('nhs')

.controller('eventCreate', ['$scope', "$state", "$rootScope", function($scope, $state, $rootScope){
    $scope.saveEvent = function(){
        $scope.eventData._id = Number((Math.random() + "").substring(3, 10));
        $rootScope.events.push($scope.eventData);
        $state.go("dashboard");
    };
}])

.controller('eventEdit', ['$scope', "$state", "$rootScope", '$stateParams', function($scope, $state, $rootScope, $stateParams){
    var id = Number($stateParams.eventID);
    var event = {};
    angular.forEach($rootScope.events, function(e) {
        if(e._id === id) {
            $scope.eventData = e;
        }
    });
}])

;
