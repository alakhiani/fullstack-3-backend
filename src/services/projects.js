const Project = require('../models/projects');

exports.getProjects = async () => {

    let timeoutMilliseconds = 20000;
    let projects = await Project.find()
        .maxTimeMS(timeoutMilliseconds)
        .lean()
        .exec();
    return projects;
}

exports.getProjectById = async (id) => {
    let project = await Project.findById(id).lean().exec();
    return project;
}

exports.createProject = async (data) => {
    const project = new Project({
        name: data.name,
        projectLink: data.projectLink,
        description: data.description,
        overview: data.overview,
        imageUrl: data.imageUrl,
        tools: data.tools,
    });
    return await project.save();
}

exports.updateProject = async (id, data) => {
    let project = await Project.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
}