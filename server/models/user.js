var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    firstname: String,
    lastname: String,
    username: { type: String, required: true, index: { unique: true}},
    password: { type: String, required: true, select: false},
    events: [ { type: Schema.Types.ObjectId, ref: 'Events'}],
    admin: { type: Boolean, default: false },
    dateCreated: { type: Date, default: new Date() },
    lastLoggedIn: { type: Date, default: new Date() }
});

UserSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err, hash) {
        if(err) return next(err);

        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password) {
    var user = this;

    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('Users', UserSchema);
