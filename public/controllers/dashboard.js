angular.module('nhs')

.controller('dashboard', ['$scope', "$state", "$rootScope", "Event", "UpcomingEvent", "$timeout", "$sce", function($scope, $state, $rootScope, Event, UpcomingEvent, $timeout, $sce){
    $scope.events = [];

    var watcher = $rootScope.$watch("user", function(n, o, s) {
        if(n && n.id) {
            Event.all()
                .then(function(events) {
                    $scope.events = events.reverse();
                });
            watcher();
        }
    });


    UpcomingEvent.all()
        .then(function(upcoming) {
            for(var i=0; i<upcoming.length; i++) {
                var u = upcoming[i],
                    desc = u.description;

                if(desc) {
                    var http = desc.toLowerCase().indexOf("http");

                    if(http > -1) {
                        var hrefText = "Link",
                            space = desc.indexOf(" ", http);

                        if(space < 0) {
                            space = desc.length;
                        }
                        
                        var html = "<a target=\"_blank\" href=\"" + desc.substring(http, space) + "\">Link</a>";
                        desc = desc.substring(0, http) + html + desc.substring(space);
                    }

                }
                u.htmlDescription = $sce.trustAsHtml(desc);
            }
            $rootScope.upcoming = upcoming;
        });

    $scope.findTotal = function() {
        var total = 0;
        for(var i = 0; i < $scope.events.length; i++){
            total += $scope.events[i].hours;
        }
        return total;
    };
}])

;
