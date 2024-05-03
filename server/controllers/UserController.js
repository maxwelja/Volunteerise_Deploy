// Handles CRUD operations for User objects in database
const Volunteer = require('../models/volunteer.model');
const Organization = require('../models/organization.model');
const mongoose = require('mongoose');



const readAllVolunteers = async (req,res) => {
    let query = {};
    if (Object.keys(req.query).length == 0) {
        query = {};
    } else {
        query = req.query;
    }
    try {
        const volunteers = await Volunteer.find(query).sort({createdAt:-1});
        res.status(200).json(volunteers);
    } catch (error) {
        console.log(error)
    }
};

// read an event and query from database
const readOneVolunteer = async (req, res) => {
    const {id} = req.params;
    console.log("Finding events with:\n", id);

    // check if id matches mongodb ObjectId type
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: "Invalid volunteer ID"});
    }

    const events = await Volunteer.find({_id: id});
    console.log("Found:", events);
    
    if (!events){
        res.status(404).json({error: "Event not found"});
    }

    res.status(200).json(events);
};

// update an event and apply change to database
const updateVolunteer = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: "Invalid event ID"});
    }

    const volunteer = await Volunteer.findOneAndUpdate({_id: id}, {...req.body}, {new: true});
    
    if (!volunteer){
        res.status(404).json({error: "Event not found"});
    }
    res.status(200).json(volunteer);
}

// delete an event and remove from database
const deleteVolunteerAccount = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: "Invalid event ID"});
    }

    const volunteer = await Volunteer.findOneAndDelete({_id: id});
    if (!volunteer){
        res.status(404).json({error: "Event not found"});
    }
    res.status(200).json(volunteer);
};

// read an event and query from database
const readOneOrganization = async (req, res) => {
    const {id} = req.params;
    console.log("Finding Org with:\n", id);

    // check if id matches mongodb ObjectId type
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: "Invalid volunteer ID"});
    }

    const organization = await Organization.find({_id: id});
    console.log("Found:", organization);
    
    if (!organization){
        res.status(404).json({error: "Event not found"});
    }

    res.status(200).json(organization);
};

// delete an event and remove from database
const deleteOrganizationAccount = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: "Invalid event ID"});
    }

    const organization = await Organization.findOneAndDelete({_id: id});
    if (!organization){
        res.status(404).json({error: "Event not found"});
    }
    res.status(200).json(organization);
};
module.exports = {
    readAllVolunteers, readOneVolunteer, updateVolunteer, deleteVolunteerAccount,
    readOneOrganization, deleteOrganizationAccount
};