const projectService = require('../services/projects');

exports.getProjects = async (req, res) => {
    try {
        if (process.env.LOG_LEVEL === 'trace') console.log("In getProjects");
        let projects = await projectService.getProjects();
        res.status(200).json({
            status: 'success',
            data: projects
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            message: 'Projects could not be retrieved.',
            details: err
        })
    }
}

exports.getProjectById = async (req, res) => {
    try {
        if (process.env.LOG_LEVEL === 'trace') console.log("In getProjectById");
        let project = await projectService.getProjectById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: project
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'not found',
            message: 'Project could not be retrieved.',
            details: err
        })
    }
}

exports.createProject = async (req, res) => {
    try {
        if (process.env.LOG_LEVEL === 'trace') console.log("In createProject");
        let project = await projectService.createProject(req.body);
        res.status(201).json({
            status: 'success',
            data: project
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            message: 'Project could not be created.',
            details: err
        })
    }
}

exports.updateProject = async (req, res) => {
    try {
        if (process.env.LOG_LEVEL === 'trace') console.log("In updateProject");
        let project = await projectService.updateProject(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            data: project
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            message: 'Project could not be updated.',
            details: err
        })
    }
}

exports.deleteProject = async (req, res) => {
    try {
        if (process.env.LOG_LEVEL === 'trace') console.log("In deleteProject");
        const project = await projectService.deleteProject(req.params.id);
        if (project) {
            // Document was deleted
            res.status(204).end();
        } else {
            // Document was not found
            res.status(404).json({
                status: 'error',
                message: 'Project not found, nothing was deleted.',
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            message: 'Project could not be deleted.',
            details: err,
        });
    }
};