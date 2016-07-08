angular.module('nhs')

.controller('mainController', ['$scope', '$rootScope', '$state', 'Auth', function($scope, $rootScope, $state, Auth) {
    $scope.loggedIn = Auth.isLoggedIn();
    $scope.userLogin = {};

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options) {
            $rootScope.loggedIn = Auth.isLoggedIn();

            Auth.getUser()
                .then(function(data) {
                    $rootScope.user = data.data;
                });

        });

    $scope.login = function() {
        Auth.login($scope.userLogin.username, $scope.userLogin.password)
            .then(function(data) {
                if(data.success) $state.go('users');
                else $scope.error = "Incorrect username or password";
            });
    };

    $scope.logout = function() {
        Auth.logout();
        $scope.user = {};
        $state.go('login');
    };

}]);
