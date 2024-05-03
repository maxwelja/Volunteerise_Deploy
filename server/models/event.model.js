const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema ({
    title:          {type: String, required: true, default: ""},
    organization:   {type: String, required: true, default: ""},
    location:       {type: String, required: true, default: ""},
    date:           {type: String, required: true, default: ""},
    rsvp:           {type: [String], default: []},
    hosts:          {type: [String], default: []},
    attended:       {type: [String], default: []},
}, { timestamps: true }, {collection: "Events"});

const Event = mongoose.model('Event', EventSchema)

module.exports = Event