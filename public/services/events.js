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

;


angular.module('nhs')
.factory('CommunityService', ['$http', '$rootScope', function($http, $rootScope) {

	// create a new object
	var eventFactory = {};
    var id = $rootScope.user.id;
	// get a single users events
	eventFactory.get = function(eventID) {
		return $http.get('/api/users/' + id + '/events/' + eventID)
            .then(function(response) {
                return response.data;
            });
	};

	// get all users
	eventFactory.all = function() {
		return $http.get('/api/users/' + id + '/events/')
			.then(function(response) {
				return response.data.events;
			});
	};

	// create a user
	eventFactory.create = function(eventData) {
		return $http.post('/api/users/' + id + '/events', eventData)
            .then(function(data) {
                console.log(data);
            });
	};

	// update a user
	eventFactory.update = function(eventID, eventData) {
		return $http.put('/api/users/' + id + '/events/' + eventID, eventData);
	};

	// delete a user
	eventFactory.delete = function(eventID) {
		return $http.delete('/api/users/' + id + '/events/' + eventID);
	};

	// return our entire eventFactory object
	return eventFactory;

}]);
