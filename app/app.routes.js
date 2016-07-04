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
            templateUrl: "templates/users.html",
            controller: "userController"
        })
        .state('userCreate', {
            url: "/users/create",
            templateUrl: "templates/user-create.html",
            controller: "userCreate"
        })
        .state('usersEdit', {
            url: "/users/:userID",
            templateUrl: "templates/user-edit.html",
            controller: "userEdit"
        })
        ;
}])


;
