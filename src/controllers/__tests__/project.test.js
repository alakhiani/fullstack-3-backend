const Chance = require('chance');

// What we want to test
const ProjectController = require('../projects');

// Dependencies
const ProjectService = require('../../services/projects');

const chance = new Chance();

// Mock dependencies
jest.mock('../../services/projects');

describe('When calling update project controller', () => {
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
    })

    // Can use test() or it(), they do the same thing
    test('should call ProjectService.updateProject with the id and projectData', async () => {
        // ACT
        await ProjectController.updateProject(req, res);

        // ASSERT
        expect(ProjectService.updateProject).toHaveBeenCalledWith(id, projectData);
    })

    test('should call res.status with 200 status code', async () => {
        // ACT
        await ProjectController.updateProject(req, res);

        // ASSERT
        expect(res.status).toHaveBeenCalledWith(200);
    })

    test('should call res.json with updated project data', async () => {
        // ACT
        await ProjectController.updateProject(req, res);

        // ASSERT
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            data: updatedProject
        })
    })

    it('should call res.status with 500 status code when ProjectService.updateProject call fails', async () => {
        // ARRANGE
        const error = new Error();
        ProjectService.updateProject = jest.fn().mockRejectedValue(error);

        // ACT
        await ProjectController.updateProject(req, res);

        // ASSERT
        expect(res.status).toHaveBeenCalledWith(500);
    })

    it('should call res.json with error message when ProjectService.updateProject call fails', async () => {
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