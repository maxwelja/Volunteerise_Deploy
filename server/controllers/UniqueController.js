// Handles CRUD operations for event objects in database
const Event = require('../models/event.model');
const Volunteer = require('../models/volunteer.model');
const Organization = require('../models/organization.model');
const mongoose = require('mongoose');



const addNotification = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: "Invalid event ID"});
    }
    const volunteer = await Volunteer.findOneAndUpdate({_id: id}, {...req.body}, {new: true});

    if (!volunteer){
        res.status(404).json({error: "Event not found"});
    }

    res.status(200).json(volunteer);
}

const readNotifications = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: "Invalid event ID"});
    }

    console.log("ID:", id);
    const volunteer = await Volunteer.findById(id);
    const messages = volunteer.notifications;
    console.log("V:", volunteer);
    console.log("N:", messages);

    if (!messages) {
        res.status(404).json({error: "No Messages Found"});
    }
    res.status(200).json(messages);
}

// read an event and query from database
const readRSVPdEvents = async (req, res) => {
    const {id} = req.params;
    console.log("Finding events with:\n", id);

    // check if id matches mongodb ObjectId type
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: "Invalid volunteer ID"});
    }

    const events = await Event.find({ attendees: { $in: [id] }});
    console.log("Found:", events);
    
    if (!events){
        res.status(404).json({error: "Event not found"});
    }

    res.status(200).json(events);
};

// read an event and query from database
const readHostedEvents = async (req, res) => {
    const {id} = req.params;
    console.log("Finding events with:\n", id);

    // check if id matches mongodb ObjectId type
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: "Invalid volunteer ID"});
    }

    //find events with users id in the hosts array
    const hostedEvents = await Event.find({ hosts: { $in: [id] }});
    console.log("Found:", hostedEvents);
    
    if (!hostedEvents){
        res.status(404).json({error: "Event not found"});
    }

    res.status(200).json(hostedEvents);
};

module.exports = {
    addNotification, readRSVPdEvents, readHostedEvents, readNotifications
};