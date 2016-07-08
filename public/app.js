angular.module('nhs', [
    'ui.router',
    'nhs.auth'
])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}])

;
