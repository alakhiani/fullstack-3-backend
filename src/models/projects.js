const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
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
            type: [{ type: String }],
            required: true
        },
        projectLink: {
            type: String,
        }
    }, {
    versionKey: "__v",
    timestamps: true
}
);

// TODO: This is work in progress, its not yet working as expected

// Pre middleware to update the version number before 'findOneAndUpdate' or 'findByIdAndUpdate'
// projectSchema.pre("findOneAndUpdate", function (next) {
//     this.set({}, { $inc: { __v: 1 } }, next);
// });

// projectSchema.pre("findByIdAndUpdate", function (next) {
//     this.set({}, { $inc: { __v: 1 } }, next);
// });

module.exports = mongoose.model('Project', projectSchema);