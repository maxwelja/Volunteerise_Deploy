const Volunteer = require('../models/volunteer.model.js');
const Organization = require('../models/organization.model.js');

const registerVolunteer = async (req, res) => {
    console.log("Payload at Register:", req.body);
    const {volunteerName, volunteerEmail, volunteerPassword, volunteerNotifications} = req.body;
    console.log("Notifications:", volunteerName);
    console.log("Notifications:", volunteerEmail);
    console.log("Notifications:", volunteerPassword);
    console.log("Notifications:", volunteerNotifications);
    try {
        const newVolunteer = new Volunteer({
            volunteerName: volunteerName,
            volunteerEmail: volunteerEmail,
            volunteerPassword: volunteerPassword,
            notifications: volunteerNotifications
        });
        
        console.log("Before Save:", newVolunteer);
        const savedVolunteer = await newVolunteer.save();

        res.json({ status: 'ok', data: savedVolunteer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'connection issue' });
    }
}

const registerOrganization = async (req, res) => {
    try {
        const newOrganization = new Organization({
            orgName : req.body.orgName,
            orgEmail: req.body.orgEmail,
            orgLink: req.body.orgLink,
            orgPassword: req.body.orgPassword
        });

        const savedOrganization = await newOrganization.save();

        res.json({status: 'ok', data:savedOrganization})
    }
    catch(error) {
        console.error(error);
        res.status(500).json({error: 'connection issue'});
    }
}

const loginVolunteer = async (req, res) => {
    const {email, password} = req.body;

    const volunteer = await Volunteer.findOne({volunteerEmail: email});

    if (!volunteer) {
        return res.status(404).json({error: 'Volunteer not found'})
    }

    if (volunteer.volunteerPassword !== password) {
        return res.status(401).json({error: 'email or password is not correct'})
    }

    res.status(200).json(volunteer)
}

const loginOrganization = async (req, res) => {
    const {email,password} = req.body;

    const organization = await Organization.findOne({orgEmail: email});

    if (!organization) {
        return res.status(404).json({error: 'Organization not found'})
    }

    if (organization.orgPassword !== password) {
        return res.status(401).json({error: 'email or password is not correct'})
    }

    res.status(200).json(organization)
}

module.exports = {
    registerVolunteer,
    registerOrganization,
    loginVolunteer,
    loginOrganization
}