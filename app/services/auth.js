function AuthFactory($http, $q, AuthToken) {
    var auth = {};

    auth.login = function(username, password) {
        return $http.post('/api/token', {
            username: username,
            password: password
        })
        .then(function(response) {
            var data = response.data;
            if(data.token) {
                AuthToken.setToken(response.data.token);
            }
            return data;
        });
    };

    auth.logout = function() {
        AuthToken.setToken();
    };

    auth.isLoggedIn = function() {
        return !!AuthToken.getToken();
    };

    auth.getUser = function() {
        if(auth.isLoggedIn())
            return $http.get('/api/me', { cache: true });
        else
            return $q.reject({ message: 'User has no token.'});
    };

    return auth;
}

function AuthTokenFactory($window) {
    var tokenFactory = {};

    tokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    };

    tokenFactory.setToken = function(token) {
        if(token) $window.localStorage.setItem('token', token);
        else $window.localStorage.removeItem('token');
    };

    return tokenFactory;
}

function AuthInterceptorFactory($q, $injector, AuthToken) {
    var interceptor = {};

    interceptor.request = function(config) {
        var token = AuthToken.getToken();
        if(token) config.headers['x-access-token'] = token;
        return config;
    };

    interceptor.responseError = function(response) {
        if(response.status == 403) {
            AuthToken.setToken();
            $injector.get("$state").go('login');
        }
        return $q.reject(response);
    };

    return interceptor;
}

angular.module('nhs.auth', [])

    .factory('Auth', ['$http', '$q', 'AuthToken', AuthFactory])
    .factory('AuthToken', ['$window', AuthTokenFactory])
    .factory('AuthInterceptor', ['$q', '$injector', 'AuthToken', AuthInterceptorFactory])
;
