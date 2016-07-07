angular.module('nhs')

.run(function ($state,$rootScope) {
    $rootScope.state = $state;
})

.controller('main', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state){
    $scope.getState = function() {
        return $state.current.name; 
    };
}]);
