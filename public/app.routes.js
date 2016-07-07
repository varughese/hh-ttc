angular.module('nhs')

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/login');

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: 'templates/login.html'
        })
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "templates/dashboard.html",
            controller: "dashboard"
        })
        .state('userCreate', {
            url: "/dashboard/create",
            templateUrl: "templates/dashboard-create.html",
            controller: "dashCreate"
        })
        .state('usersEdit', {
            url: "/dashboard/:userID",
            templateUrl: "templates/dashboard-edit.html",
            controller: "dashEdit"
        })
        ;
}])


;
