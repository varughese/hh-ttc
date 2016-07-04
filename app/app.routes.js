angular.module('nhs')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url: "/home",
        template: 'Home'
    });
}])


;
