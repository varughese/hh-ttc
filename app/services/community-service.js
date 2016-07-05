angular.module('nhs')
.factory('CommunityService', ['$http', '$rootScope', function($http, $rootScope) {

	// create a new object
	var eventFactory = {};
    var id = $rootScope.user._id;
	// get a single users events
	eventFactory.get = function() {
		return $http.get('/api/users/' + id + '/events')
            .then(function(response) {
                return response.data.events;
            });
	};

	// get all users
	eventFactory.all = function() {
		return $http.get('/api/events/');
	};

	// create a user
	eventFactory.create = function(eventData) {
		return $http.post('/api/users/' + id + '/event', eventData);
	};

	// update a user
	eventFactory.update = function(eventData) {
		return $http.put('/api/users/' + id + '/event', eventData);
	};

	// delete a user
	eventFactory.delete = function() {
		return $http.delete('/api/users/' + id) + '/event';
	};

	// return our entire eventFactory object
	return eventFactory;

}]);
