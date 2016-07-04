var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

var UserSchema = new Schema({
    name: String,
    username: { type: String, required: true, index: { unique: true}},
    password: { type: String, required: true, select: false}
});
