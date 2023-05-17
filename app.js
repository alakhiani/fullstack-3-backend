const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const ProjectsRoutes = require('./src/routes/projects');
// const { connectToDB } = require('./db');

const app = express();
app.use(express.json());
app.use('/projects', ProjectsRoutes);

const port = process.env.PORT || 8000;

// Connect to MongoDB Atlas
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB Atlas');
        app.listen(port, () => {
            console.log('Express server is listening on port', port);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
};

// Establish the MongoDB Atlas database connection and start the Express server
start();