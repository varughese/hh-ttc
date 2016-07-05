angular.module('nhs')

.controller('eventsController', ['$scope', 'CommunityService', function($scope, CommunityService) {
    $scope.processing = true;

    function getEvents() {
        CommunityService.all()
        .then(function(data) {
            $scope.processing = false;

            $scope.events = data.data;
        });
    }

    getEvents();

    $scope.deleteEvent = function(id) {
        CommunityService.delete(id)
            .then(function(data) {
                getEvents();
            });
    };
}])

;
