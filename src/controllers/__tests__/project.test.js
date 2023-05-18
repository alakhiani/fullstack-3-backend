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

        ProjectService.updateProject = jest.fn().mockResolvedValue(updatedProject);
    })

    // Can use test() or it(), they do the same thing
    test('should call ProjectService.updateProject with the id and projectData', async () => {
        // Act
        await ProjectController.updateProject(req, res);

        // Assert
        expect(ProjectService.updateProject).toHaveBeenCalledWith(id, projectData);
    })

    test('should call res.status with 200 status code', async () => {
        // Act
        await ProjectController.updateProject(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
    })

    test('should call res.json with updated project data', async () => {
        // Act
        await ProjectController.updateProject(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            data: updatedProject
        })
    })
})