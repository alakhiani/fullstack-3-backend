const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const ProjectsRoutes = require('./src/routes/projects');

const app = express();
app.use(express.json());
app.use('/projects', ProjectsRoutes);

// Connect to MongoDB Atlas
const start = async (port, database_uri) => {
    try {
        await mongoose.connect(database_uri);
        console.log('Connected to MongoDB Atlas');
        app.listen(port, () => {
            console.log('Express server is listening on port', port);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
};

// Establish the MongoDB Atlas database connection and start the Express server
const port = process.env.PORT || 8000;
const database_uri = process.env.MONGO_URI;
if (process.env.NODE_ENV !== 'test') {
    // Only connect to the database when not running tests
    start(port, database_uri);
}

module.exports = { app, start };