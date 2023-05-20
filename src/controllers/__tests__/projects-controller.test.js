const Chance = require('chance');

// What we want to test
const ProjectController = require('../projects');

// Dependencies
const ProjectService = require('../../services/projects');

const chance = new Chance();

// Mock dependencies
jest.mock('../../services/projects');

describe('When calling the project controller update project', () => {
    let id, projectData, updatedProject;

    // Arrange
    beforeEach(() => {

        id = chance.guid();

        projectData = {
            name: chance.word(),
            description: chance.paragraph(),
            // projectLink: chance.url(),
            // overview: chance.paragraph(),
            // imageUrl: chance.url(),
            // tools: [chance.word(), chance.word()],
        };

        updatedProject = projectData;

        req = {
            params: { id },
            body: projectData,
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        }

        global.console = {
            log: jest.fn(),
            error: jest.fn(),
        }

        ProjectService.updateProject = jest.fn().mockResolvedValue(updatedProject);
        ProjectService.deleteProject = jest.fn().mockResolvedValue(projectData);
    })

    // Can use test() or it(), they do the same thing
    test('Positive Test: should call ProjectService.updateProject with the id and projectData', async () => {
        // ACT
        await ProjectController.updateProject(req, res);

        // ASSERT
        expect(ProjectService.updateProject).toHaveBeenCalledWith(id, projectData);
    })

    test('Positive Test: call to ProjectController.updateProject should call res.status with 200 status code', async () => {
        // ACT
        await ProjectController.updateProject(req, res);

        // ASSERT
        expect(res.status).toHaveBeenCalledWith(200);
    })

    test('Positive Test: call to ProjectController.updateProject should call res.json with updated project data', async () => {
        // ACT
        await ProjectController.updateProject(req, res);

        // ASSERT
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            data: updatedProject
        })
    })

    it('Negative Test: should call res.status with 500 status code when ProjectService.updateProject call fails', async () => {
        // ARRANGE
        const error = new Error();
        ProjectService.updateProject = jest.fn().mockRejectedValue(error);

        // ACT
        await ProjectController.updateProject(req, res);

        // ASSERT
        expect(res.status).toHaveBeenCalledWith(500);
    })

    it('Negative Test: should call res.json with error message when ProjectService.updateProject call fails', async () => {
        // ARRANGE
        const error = new Error("Mock error");
        ProjectService.updateProject = jest.fn().mockRejectedValue(error);

        // ACT
        await ProjectController.updateProject(req, res);

        // ASSERT
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Project could not be updated.',
            details: error
        })
    })
})

describe('When calling the project controller delete project', () => {
    let id, projectData;

    // Arrange
    beforeEach(() => {

        id = chance.guid();

        projectData = {
            name: chance.word(),
            description: chance.paragraph(),
            projectLink: chance.url(),
            overview: chance.paragraph(),
            imageUrl: chance.url(),
            tools: [chance.word(), chance.word()],
        };

        req = {
            params: { id },
            body: projectData,
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        }

        global.console = {
            log: jest.fn(),
            error: jest.fn(),
        }

        ProjectService.deleteProject = jest.fn().mockResolvedValue(projectData);
    })

    test('Positive Test: should call ProjectService.deleteProject with the id', async () => {
        // ACT
        await ProjectController.deleteProject(req, res);

        // ASSERT
        expect(ProjectService.deleteProject).toHaveBeenCalledWith(id);
    })

    test('Positive Test: call to ProjectController.deleteProject should call res.status with 200 status code', async () => {
        // ACT
        await ProjectController.deleteProject(req, res);

        // ASSERT
        expect(res.status).toHaveBeenCalledWith(204);
    })

    test('Positive Test: call to ProjectController.deleteProject should call res.json with deleted project data', async () => {
        // ACT
        await ProjectController.deleteProject(req, res);

        // ASSERT
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            data: projectData,
        })
    })

    it('Negative Test: call to ProjectController.deleteProject should call res.status with 500 status code when ProjectService.deleteProject call fails', async () => {
        // ARRANGE
        const error = new Error();
        ProjectService.deleteProject = jest.fn().mockRejectedValue(error);

        // ACT
        await ProjectController.deleteProject(req, res);

        // ASSERT
        expect(res.status).toHaveBeenCalledWith(500);
    })

    it('Negative Test: call to ProjectController.deleteProject should call res.json with error message when ProjectService.deleteProject call fails', async () => {
        // ARRANGE
        const error = new Error("Mock error");
        ProjectService.deleteProject = jest.fn().mockRejectedValue(error);

        // ACT
        await ProjectController.deleteProject(req, res);

        // ASSERT
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Project could not be deleted.',
            details: error
        })
    })

    it('Negative Test: call to ProjectController.deleteProject should call res.status with 404 status code when ProjectService.deleteProject call succeeds but is unable to find the project id to be deleted', async () => {
        // ARRANGE
        const error = new Error();
        ProjectService.deleteProject = jest.fn().mockResolvedValue(null);

        // ACT
        await ProjectController.deleteProject(req, res);

        // ASSERT
        expect(res.status).toHaveBeenCalledWith(404);
    })
})