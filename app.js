const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const ProjectsRoutes = require('./src/routes/projects');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/projects', ProjectsRoutes);

// Connect to MongoDB Atlas
const start = async (port, database_uri) => {
    try {
        await mongoose.connect(database_uri);
        console.log('Connected to MongoDB Atlas');
        const server = app.listen(port, () => {
            console.log('Express server is listening on port', port);
        });
        return server;
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
};

const port = process.env.PORT || 8000;
const database_uri = process.env.MONGO_URI;

// Establish the MongoDB Atlas database connection and start the Express server
if (process.env.NODE_ENV !== 'test') {
    // Only connect to the database when not running tests
    start(port, database_uri);
}

module.exports = { app, start };