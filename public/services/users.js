angular.module('nhs')

.service("users", ["user", function(user){
    return user;
    // {
    //     user:{
    //         username: "jason",
    //         password: "jasonjason",
    //         loggedOn: true
    //     }
    // };
}])

;
