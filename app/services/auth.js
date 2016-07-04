function AuthFactory($http, $q, AuthToken) {
    var auth = {};

    auth.login = function(username, password) {
        return $http.post('/api/auth', {
            username: username,
            password: password
        })
        .then(function(data) {
            AuthToken.setToken(data.token);
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
            return $http.get('/api/me');
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

function AuthInterceptorFactory($q, AuthToken) {

}

angular.module('nhs.auth', [])

    .factory('Auth', ['$http', '$q', 'AuthToken', AuthFactory])
    .factory('AuthToken', ['$window', AuthTokenFactory])
    .factory('AuthInterceptor', ['$q', 'AuthToken', AuthInterceptorFactory])
;
