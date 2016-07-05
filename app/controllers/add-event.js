angular.module('nhs')

.controller('addEvent', ['$scope', '$state', 'CommunityService', function($scope, $state, CommunityService) {
    $scope.serviceEvent = {};
$scope.type = 'create';
    $scope.saveEvent = function() {
        CommunityService.create($scope.serviceEvent);
    };

}])

.controller('editEvent', ['$scope', '$state', 'CommunityService', '$stateParams', function($scope, $state, CommunityService, $stateParams) {
    $scope.serviceEvent = {};

    CommunityService.get($stateParams.eventID)
        .then(function(data) {
            $scope.serviceEvent = data;
        });
$scope.type = 'edit';

    $scope.saveEvent = function() {
        $scope.processing = true;
        CommunityService.update($stateParams.eventID, $scope.serviceEvent)
            .then(function(data) {
                $scope.processing = false;
                $scope.serviceEvent = {};
                $scope.message = data.data.message;
            });
    };

}]);
