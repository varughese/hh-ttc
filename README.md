# hh-nhs
NHS Website


## Screens Description

Right now the files in `app` folder are a janky front end. Make your changes into a `public` folder and use http-server to run the public folder. Use `grunt` if you want to but you can just copy and paste libs into this. You can run `nodemon server.js` and then go to `localhost:8080` if you wanna check out what it looks like right now.


Each one of these screens will have its own controller. Make the names make sense and set it up like you set up the form designer.

### Login
- Username
- Password
- Submit
  - Should set Log in property to `true`
  - Should put the username on `user` object on scope. (Most things will use `ng-model`)
  - Take you to Dashboard

### Dashboard
- Navbar (Navbar should show when logged in. Use `ng-show`)
  - Should display `Hello <username>`
- New Screen
- Table that uses `ng-repeat` to loop through events object on the scope.
  - Each row displays
     - Event Name
     - Hours
     - Date
     - Edit
       - Takes you to the edit page passing in event ID as the parameter
     - Delete
       - Just have this log to the console the ID of the event
  - Somewhere should be a total of the Hours
  
### Events
Each thing should have the `ng-model` for the inputs onto the `eventData` object on scope. 
For Date input field try experimenting with angular-ui-bootstrap's Date Picker. [Link to Documentation](https://angular-ui.github.io/bootstrap/#/datepicker)

The Edit and Create html will be so similar that you will just use the same template for both. Check into `ng-if`. Each one will have a different button depending on the the type. Each one of these screens will have its own controller. 

#### Edit  
- Should just be able to edit all event properties
- Save button
  - Saves individual ID in `events` array on scope
  - Takes you back to dashboard

#### Create
- Should have inputs for all appropiate fields 
- Create button
   - Pushs `eventData` onto `events` on scope
   - Takes you back to dashboard
  


### Example Data Structures
#### User
```js
$scope.user = {
  loggedIn: true,
  username: varhawk.
  password: deeznuts
}
```
### Events
```js
$scope.events = [
  {
    _id: 1,
    name: "Special Olympics",
    date: "5/29/2016", // may be a different Date format depending on how you save it
    hours: 10,
    checked: false // later this will be used to check if Lauren checked it or not
  },
  {
    _id: 1,
    name: "Blood Drive",
    date: "5/16/2015", // may be a different Date format depending on how you save it
    hours: 3,
    checked: false // later this will be used to check if Lauren checked it or not
  },
]
```
