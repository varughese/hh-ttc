angular.module('nhs')

.controller('login', ['$scope', "$state", "$rootScope", "Auth", function($scope, $state, $rootScope, Auth){

    $scope.login = function(){

        Auth.login($scope.user.username, $scope.user.password)
            .then(function(user) {
                $rootScope.user = user;
                $state.go('dashboard');
            });
    };
}]);
