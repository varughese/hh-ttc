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
        .state("event", {
            url: "/event",
            template: "<div ui-view></div>",
            abstract: true
        })
        .state("event.create", {
            url: "/create",
            templateUrl: "templates/event.html",
            controller: "eventCreate"
        })
        .state("event.edit", {
            url: "/edit:eventID",
            templateUrl: "templates/event.html",
            controller: "eventEdit"
        })
        ;
}])


;
