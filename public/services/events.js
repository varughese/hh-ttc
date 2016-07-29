angular.module('nhs')

.factory("Event", ["$http", "$rootScope", "Auth", function($http, $rootScope,Auth){
    var userID = $rootScope.user.id,
        apiUrl = '/api/users/' + userID + '/events/';

    var e = {};

    e.all = function() {
        return $http.get(apiUrl)
            .then(function(repsonse) {
                return repsonse.data;
            });
    };

    e.create = function(eventData) {
        return $http.post(apiUrl, eventData);
    };

    e.get = function(eventID) {
        return $http.get(apiUrl + eventID)
            .then(function(response) {
                return response.data;
            });
    };

    e.update = function(eventID, eventData) {
        return $http.put(apiUrl + eventID, eventData);
    };

    e.delete = function(eventID) {
        return $http.delete(apiUrl + eventID);
    };

    return e;


}])

.factory("UpcomingEvent", ["$http", "$rootScope", "Auth", function($http, $rootScope,Auth){
    var apiUrl = '/api/upcoming-events/';

    var e = {};

    e.all = function() {
        return $http.get(apiUrl)
            .then(function(repsonse) {
                return repsonse.data;
            });
    };

    e.create = function(eventData) {
        return $http.post(apiUrl, eventData);
    };

    e.get = function(eventID) {
        return $http.get(apiUrl + eventID)
            .then(function(response) {
                return response.data;
            });
    };

    e.update = function(eventID, eventData) {
        return $http.put(apiUrl + eventID, eventData);
    };

    e.delete = function(eventID) {
        return $http.delete(apiUrl + eventID);
    };

    return e;


}])

;
