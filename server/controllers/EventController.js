// Handles CRUD operations for event objects in database
const Event = require('../models/event.model');
const Volunteer = require('../models/volunteer.model');
const Organization = require('../models/organization.model');
const mongoose = require('mongoose');

// create a new event and post to database
const createEvent = async (req, res) => {
    try {
        const data = new Event({
            title: req.body.title,
            organization: req.body.organization,
            location: req.body.location,
            date: req.body.date,
            hosts: req.body.hosts
        });
        const event = await data.save();
        res.status(200).json(event);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
};

// read an event and query from database
const readEvent = async (req, res) => {
    const {id} = req.params;

    // check if id matches mongodb ObjectId type
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: "Invalid event ID"});
    }

    const event = await Event.findById(id);
    
    if (!event){
        return res.status(404).json({error: "Event not found"});
    }

    res.status(200).json(event);
};

// read all events and query from database
// display in newest to oldest order by create date
const readAll = async (req, res) => {
    let query = {};
    if (Object.keys(req.query).length == 0) {
        query = {};
    } else {
        query = req.query;
    }
    try {
        const events = await Event.find(query).sort({createdAt:-1});
        res.status(200).json(events);
    } catch (error) {
        console.log(error)
    }
};

// update an event and apply change to database
const updateEvent = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: "Invalid event ID"});
    }

    const event = await Event.findOneAndUpdate({_id: id}, {...req.body}, {new: true});
    
    if (!event){
        res.status(404).json({error: "Event not found"});
    }
    res.status(200).json(event);
}

// delete an event and remove from database
const deleteEvent = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: "Invalid event ID"});
    }

    const event = await Event.findOneAndDelete({_id: id});
    if (!event){
        res.status(404).json({error: "Event not found"});
    }
    res.status(200).json(event);
};

module.exports = {
    createEvent, readEvent, readAll, updateEvent, deleteEvent,
};