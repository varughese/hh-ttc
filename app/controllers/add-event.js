angular.module('nhs')

.controller('addEvent', ['$scope', '$state', 'CommunityService', function($scope, $state, CommunityService) {
    $scope.serviceEvent = {};

    $scope.addEvent = function() {
        CommunityService.create($scope.serviceEvent);
    };

}]);
