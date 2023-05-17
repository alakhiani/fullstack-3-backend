const projectService = require('../services/projects');

exports.getProjects = async (req, res) => {
    try {
        let projects = await projectService.getProjects();        
        res.status(200).json({
            status: 'success',
            data: projects
        });
    } catch(err) {
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
        let project = await projectService.getProjectById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: project
        });
    } catch(err) {
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
        console.log(req.body);
        let project = await projectService.createProject(req.body);
        res.status(201).json({
            status: 'success',
            data: project
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            status: 'error',
            message: 'Project could not be created.',
            details: err
        })
    }
}