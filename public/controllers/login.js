angular.module('nhs')

.controller('login', ['$scope', "$state", "$rootScope", "Auth", function($scope, $state, $rootScope, Auth){
    $scope.processing = false;

    if($rootScope.user.loggedIn) $state.go("dashboard");

    $scope.login = function(){
        $scope.processing = true;

        Auth.login($scope.user.username, $scope.user.password)
            .then(function(user) {
                $rootScope.user = user;
                $state.go('dashboard');
            })
            .catch(function(err) {
                $scope.error = err;
            });
    };
}]);
