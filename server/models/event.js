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

var UpcomingEventSchema = new Schema({
    name: { type: String, required: true },
    timeStart: Date,
    timeEnd: Date,
    date: Date,
    location: String,
    description: String
});

module.exports = {
    events: mongoose.model('Events', EventSchema),
    upcomingEvents: mongoose.model('UpcomingEvents', UpcomingEventSchema)
};
