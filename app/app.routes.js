angular.module('nhs')

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: 'templates/login.html'
        })
        .state('users', {
            url: "/users",
            templateUrl: "templates/users.html"
        });
}])


;
