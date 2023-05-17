const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    overview: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true
    },
    tools: {
        type: [{type: String}],
        required: true
    },
    projectLink: {
        type: String,
    }
})

module.exports = mongoose.model('Project', projectSchema);