
function AuthFactory($http, $q, AuthToken, $cacheFactory) {
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
                return data;
            } else {
                throw data.message;
            }
        });
    };

    auth.logout = function() {
        $cacheFactory.get('$http').remove('/api/me/');
        AuthToken.setToken();
    };

    auth.loggedIn = function() {
        return !!AuthToken.getToken();
    };

    auth.getUser = function() {
        if(auth.loggedIn())
            return $http.get('/api/me/', { cache: true });
        else
            return $q.reject({ message: 'User has no token.'});
    };

    return auth;
}

function AuthTokenFactory(storageService) {
    var tokenFactory = {};

    tokenFactory.getToken = function() {
        return storageService.getItem('token');
    };

    tokenFactory.setToken = function(token) {
        if(token) storageService.setItem('token', token);
        else storageService.removeItem('token');
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

function StorageService($window) {
    var storage = $window.localStorage;

    try {
        localStorage.setItem("__update", new Date().toLocaleString());
    } catch (error) {
        console.error("Browser in Private Browsing or does not support LocalStorage. Using mock storage");
        storage = {
            setItem: function(key, value) {
                this[key] = value;
            },
            getItem: function(key) {
                return this[key];
            },
            removeItem: function(key) {
                delete this[key];
            }
        };
    }

    this.setItem = function(key, value) {
        storage.setItem(key, value);
    };

    this.getItem = function(key) {
        return storage.getItem(key);
    };

    this.removeItem = function(key) {
        storage.removeItem(key);
    };
}

angular.module('nhs.auth', [])

    .factory('Auth', ['$http', '$q', 'AuthToken', '$cacheFactory', AuthFactory])
    .factory('AuthToken', ['storageService', AuthTokenFactory])
    .factory('AuthInterceptor', ['$q', '$injector', 'AuthToken', AuthInterceptorFactory])
    .service('storageService', ["$window", StorageService])
;
