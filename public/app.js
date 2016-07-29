angular.module('nhs', [
    'ui.router',
    'ui.bootstrap',
    'nhs.auth'
])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}])

;
