angular.module('nhs')

.controller('login', ['$scope', "$state", function($scope, $state){
    $scope.login = function(){
        $scope.user = {
            loggedIn: true,
            username: "jason",
            password: "deeznuts"
        };

        $state.go('dashboard');
    };
}]);
