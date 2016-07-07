angular.module('nhs')

.controller('login', ['$scope', "$state", "$rootScope", function($scope, $state, $rootScope){

    $scope.login = function(){
        $scope.user.loggedOn = true;
        $rootScope.user = $scope.user;
        $state.go('dashboard');
    };
}]);
