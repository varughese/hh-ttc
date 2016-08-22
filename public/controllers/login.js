angular.module('nhs')

.controller('login', ['$scope', "$state", "$rootScope", "Auth", function($scope, $state, $rootScope, Auth){
    $scope.processing = false;

    if(Auth.loggedIn()) $state.go("dashboard");

    $scope.login = function(){
        $scope.processing = true;

        Auth.login($scope.user.username.toLowerCase(), $scope.user.password)
            .then(function(user) {
                $rootScope.user = user;
                $state.go('dashboard');
            })
            .catch(function(err) {
                $scope.error = err;
            });
    };
}])

.controller('signup', ['$scope', "$state", "$rootScope", "User", function($scope, $state, $rootScope, User){
    $scope.processing = false;

    if(User.loggedIn()) $state.go("dashboard");

    $scope.signup = function(){
		console.log($scope.signup);
		$scope.processing = true;

        User.login($scope.user.username.toLowerCase(), $scope.user.password)
            .then(function(user) {
                $rootScope.user = user;
                $state.go('dashboard');
            })
            .catch(function(err) {
                $scope.error = err;
            });
    };
}])

;
