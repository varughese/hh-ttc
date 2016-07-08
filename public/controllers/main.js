angular.module('nhs')

.run(function ($state,$rootScope) {
    $rootScope.state = $state;
})

.controller('main', ['$scope', '$rootScope', '$state', 'Auth', function($scope, $rootScope, $state, Auth){
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
                console.log(err);
            });

    });

    $scope.logout = function() {
        Auth.logout();
        $rootScope.user = {};
        $rootScope.user.loggedIn = false;
        $state.go("login");
    };

    var events = [
        {
            _id: 1,
            name: "Special Olympics",
            date: "5/29/2016",
            hours: 10,
            checked: false
        },
        {
            _id: 2,
            name: "Blood Drive",
            date: "5/16/2015",
            hours: 3,
            checked: false
        },
    ];

    $rootScope.events = events;
}]);
