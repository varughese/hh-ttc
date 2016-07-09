var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

var EventSchema = new Schema({
    name: { type: String, required: true },
    hours: { type: Number, required: true },
    checked: { type: Boolean, default: false },
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Events', EventSchema);
