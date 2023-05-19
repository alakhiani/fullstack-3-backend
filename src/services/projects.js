const Project = require('../models/projects');

exports.getProjects = async () => {
    let projects = await Project.find()
        .lean()
        .exec();
    return projects;
}

exports.getProjectById = async (id) => {
    let project = await Project.findById(id)
        .lean()
        .exec();
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
    return await Project.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    })
        .lean()
        .exec();
}

exports.deleteProject = async (id) => {
    return await Project.findByIdAndDelete(id)
        .lean()
        .exec();
}

// TODO: Day8, Add contact me to save a list of potential contacts