const mongoose = require('mongoose')

const OrganizationSchema = new mongoose.Schema({
    orgName:                {type: String, required: true},
    orgEmail:               {type: String, required: true, unique: true},
    orgLink:                {type: String, required: true, unique:true},
    orgPassword:            {type: String, required: true},
    donationLink:           {type: String, default: ""},
    hostedEvents:        {type: [String], default: []},
    collaboratedEvents:  {type: [String], default: []}
}, {collection: 'OrganizationData'}
)

const Organization = mongoose.model('Organization', OrganizationSchema)

module.exports = Organization