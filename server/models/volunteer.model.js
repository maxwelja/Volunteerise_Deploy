const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

const VolunteerSchema = new mongoose.Schema({
    volunteerName:      {type: String, required: true},
    volunteerEmail:     {type: String, required: true, unique: true},
    volunteerPassword:  {type: String, required: true},
    notifications:      {type: [String], default: ["Welcome to Volunteerise!"]},
    attendedEvents:     {type: [String], default: []},
    rsvpEvents:         {type: [String], default: []},
    karma:     {type: Number, default: 0},
    bio:       {type: String, default: ""}
}, {collection: 'VolunteerData'}
)

const Volunteer = mongoose.model('VolunteerData', VolunteerSchema)

module.exports = Volunteer