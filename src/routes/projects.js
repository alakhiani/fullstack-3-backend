const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projects');

router.get('/', ProjectController.getProjects);
router.get("/:id", ProjectController.getProjectById);
router.post('/', ProjectController.createProject);
router.put('/:id', ProjectController.updateProject);
router.delete('/:id', ProjectController.deleteProject);

module.exports = router;