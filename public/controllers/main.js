angular.module('nhs')

.controller('main', ['$scope', '$rootScope', '$state', 'Auth', function($scope, $rootScope, $state, Auth){
    $rootScope.user = $rootScope.user || {};

    $scope.getState = function() {
        return $state.current.name;
    };


    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {

        Auth.getUser()
            .then(function(data) {
                $rootScope.user = data.data;
                $rootScope.user.loggedIn = true;
            })
            .catch(function(err) {
                if(toState.name !== "login") $state.go('login');
            });

    });

    $scope.logout = function() {
        Auth.logout();
        $rootScope.user = {};
        $rootScope.user.loggedIn = false;
        $state.go("login");
        location.reload(true);
    };

}]);
