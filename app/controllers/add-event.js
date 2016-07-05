angular.module('nhs')

.controller('addEvent', ['$state', 'CommunityService', function($state, CommunityService) {
    $scope.serviceEvent = {};

    CommunityService.get()
        .then(function(events) {
            $scope.events = events;
        });

    $scope.addEvent = function() {
        CommunityService.add($scope.serviceEvent);
    };

}]);
