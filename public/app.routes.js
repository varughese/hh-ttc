angular.module('nhs')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "templates/login.html",
            controller: "login"
        })
        .state("dashboard", {
            url: "/dashboard",
            templateUrl: "templates/dashboard.html",
            controller: "dashboard"
        })
        .state("create", {
            url: "/dashboard/create",
            templateUrl: "templates/dashboard-create.html",
            controller: "dashCreate"
        })
        .state("edit", {
            url: "/dashboard/:userID",
            templateUrl: "templates/dashboard-edit.html",
            controller: "dashEdit"
        })
        ;
}])


;
