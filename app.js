const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const ProjectsRoutes = require('./src/routes/projects');
const { connectToDB } = require('./db');

const app = express();
app.use(express.json());
app.use('/projects', ProjectsRoutes);

const PORT = process.env.PORT || 8000;
connectToDB(process.env.MONGO_URI, process.env.MONGO_DATABASE, () => {
    console.log('Database connection established, starting server.');
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});