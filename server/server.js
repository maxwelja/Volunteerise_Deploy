// For backend setup
// import ".env" file for global definitions
require('dotenv').config();

// middleware imports
const express = require('express');
const cors = require("cors");

// build express app
const app = express();

// tell express to collect data in .json format
app.use(express.json());

// allows cross origin response sharing (communication between the different ports for frontend and backend)
app.use(cors());

// tells express where the api endpoints are
const routes = require('./routing');
app.use('/api/', routes);

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { dbName: 'Volunteerise'})
    .then (() => {
        // listen for requests on given port
        app.listen(process.env.PORT, () => {
            console.log('Server Connected on Port:', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });