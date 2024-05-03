const express = require('express');
const router = express.Router();

// functions
const {
    createEvent, readEvent, readAll, updateEvent, deleteEvent,
} = require('./controllers/EventController');
const {
    registerVolunteer, registerOrganization,
    loginVolunteer, loginOrganization
} = require('./controllers/LoginController.js');
const {
    readAllVolunteers, readOneVolunteer, updateVolunteer, deleteVolunteerAccount,
    readOneOrganization, deleteOrganizationAccount,
} = require('./controllers/UserController.js');
const {
    addNotification, readRSVPdEvents, readHostedEvents, readNotifications
} = require('./controllers/UniqueController.js');

// Event CRUD operations
router.post('/events', createEvent);
router.get('/events/:id', readEvent);
router.get('/events/', readAll);
router.patch('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

// User CRUD operations
router.get('/VolunteerData/', readAllVolunteers);
router.get('/VolunteerData/:id', readOneVolunteer);
router.patch('/VolunteerData/:id', updateVolunteer);
router.delete('/VolunteerData/:id', deleteVolunteerAccount);
router.delete('/OrganizationData/:id', deleteOrganizationAccount);
router.get('/OrganizationData/:id', readOneOrganization);

// Login and Create Account
router.post('/registerVolunteer', registerVolunteer);
router.post('/registerOrganization', registerOrganization);
router.post('/loginVolunteer', loginVolunteer);
router.post('/loginOrganization', loginOrganization);

// Unique operations
router.patch('/notify/:id', addNotification);
router.get('/rsvp/:id', readRSVPdEvents);
router.get('/hosting/:id', readHostedEvents);
router.get('/notifications/:id', readNotifications);

// router.patch('/karma/', updateKarma);

module.exports = router;