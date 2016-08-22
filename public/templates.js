angular.module('nhs').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/dashboard.html',
    "<h2>Events <a ui-sref=event.create class=\"btn btn-default\"><span class=\"glyphicon glyphicon-plus\"></span> Add</a></h2><table class=\"table event-table\"><thead><tr><th>Event</th><th><span class=\"glyphicon glyphicon-hourglass\"></span> Hours</th><th><span class=\"glyphicon glyphicon-calendar\"></span> Date</th></tr></thead><tbody><tr ng-repeat=\"event in events\" ui-sref=\"event.edit({eventID: '{{event._id}}' })\"><td>{{event.name}}</td><td>{{event.hours}}</td><td>{{event.date | date : 'M/d'}}</td></tr></tbody><tfoot><td><strong>Total Hours:</strong></td><td><strong></strong>{{findTotal()}}</td><td></td></tfoot></table><h2>Upcoming Events <a ng-if=user.admin ui-sref=uevent.create class=\"btn btn-default\"><span class=\"glyphicon glyphicon-plus\"></span> Add</a></h2><table class=\"table uevent-table\"><thead><tr><th>Event</th><th>Location</th></tr></thead><tbody><tr ng-repeat=\"event in upcoming\"><td><div><b>{{event.name}}</b><div class=time-info><span><b>Start</b> {{event.timeStart}}</span> <span><b>End</b> {{event.timeEnd}}</span> <span><b>Date</b> {{event.date | date : 'M/d'}}</span></div><div class=description>{{event.description}}</div></div></td><td>{{event.location}}</td></tr></tbody></table>"
  );


  $templateCache.put('templates/event.html',
    "<h2 ng-if=\"getState() === 'event.create'\">Create Event</h2><h2 ng-if=\"getState() === 'event.edit'\">Edit Event</h2><form ng-submit=saveEvent()><div class=form-group><label>Name</label><input ng-model=eventData.name uib-typeahead=\"uevent.name for uevent in upcoming | limitTo:8 | filter:$viewValue\" typeahead-on-select=setUEvent($item) class=form-control placeholder=Name></div><div uib-datepicker ng-model=eventData.date></div><div class=form-group><label>Date</label><span class=input-group><input ng-model=eventData.date class=form-control placeholder=Date> <span class=input-group-btn><button type=button class=\"btn btn-default\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></span></div><div class=form-group><label>Hours</label><input ng-model=eventData.hours type=number step=0.5 class=form-control placeholder=Hours></div><button type=submit ng-if=\"getState() === 'event.edit'\" class=\"btn btn-primary btn-block\">Update</button> <button type=submit ng-if=\"getState() === 'event.create'\" class=\"btn btn-primary btn-block\">Create</button></form>"
  );


  $templateCache.put('templates/login.html',
    "<div class=\"row col-md-6 col-md-offset-3 login\"><div class=col-sm-12><img class=img-responsive src=../images/nhs-logo.jpeg></div><div class=login-main><h1>Login</h1><form ng-submit=login()><div class=form-group><label>Username</label><input required class=form-control ng-model=user.username></div><div class=form-group><label>Password</label><input type=password class=form-control required ng-model=user.password></div><div class=\"alert alert-danger\" ng-if=error>{{ error }}</div><button type=submit class=\"btn btn-block btn-primary\"><span ng-if=!user.processing>Login</span> <span ng-if=user.processing class=spinner><span class=\"glyphicon glyphicon-repeat\"></span></span></button></form></div></div>"
  );


  $templateCache.put('templates/members.html',
    "<h2>Member List</h2><table class=table><thead><tr><th>Name</th><th>Number of Events</th></tr></thead><tbody><tr ng-repeat=\"member in members\" ui-sref=\"singleMember({memberID: member._id})\"><td>{{member.name}}</td><td>{{member.events.length}}</td></tr></tbody></table>"
  );


  $templateCache.put('templates/single-member.html',
    "<h2>{{ member.name }}</h2><h4>Events</h4><table class=table><thead><tr><th>Event</th><th>Hours</th><th>Date</th><th>Checked?</th></tr></thead><tbody><tr ng-repeat=\"event in events\"><td>{{event.name}}</td><td>{{event.hours}}</td><td>{{event.date | date : 'M/d'}}</td><td><input ng-if=!event.checked type=checkbox ng-model=event.justChecked> <span ng-if=event.checked>Checked</span></td></tr></tbody><tfoot><td><strong>Total Hours:</strong></td><td><strong></strong>{{findTotal()}}</td><td></td><td></td></tfoot></table><button class=\"btn btn-primary\" ng-click=saveChecks()>Save</button>"
  );


  $templateCache.put('templates/uevent.html',
    "<h2 ng-if=\"getState() === 'uevent.create'\">Create Event</h2><h2 ng-if=\"getState() === 'uevent.edit'\">Edit Event</h2><form ng-submit=saveEvent()><div class=form-group><label>Name</label><input ng-model=eventData.name class=form-control placeholder=Name></div><div class=form-group><label>Date</label><input ng-model=eventData.date class=form-control placeholder=Date></div><div class=form-group><label>Location</label><input ng-model=eventData.location class=form-control placeholder=Location></div><div class=form-group><label>Time Start</label><input ng-model=eventData.timeStart class=form-control placeholder=\"Start Time, like 1:00 PM\"></div><div class=form-group><label>Time End</label><input ng-model=eventData.timeEnd class=form-control placeholder=\"End Time, like 4:00 PM\"></div><div class=form-group><label>Description</label><textarea ng-model=eventData.description class=form-control placeholder=Description></textarea></div><button type=submit ng-show=\"getState() === 'uevent.create'\" class=\"btn btn-primary btn-block\">Create</button> <button type=submit ng-if=\"getState() === 'uevent.edit'\" class=\"btn btn-primary btn-block\">Update</button></form>"
  );

}]);
