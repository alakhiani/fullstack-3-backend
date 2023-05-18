const Chance = require('chance');

const ProjectService = require('../../services/projects');

const Project = require('../../models/projects');

const chance = new Chance();

jest.mock('../../models/projects');

describe('When calling the update project service method', () => {
    let id, projectData, updatedProject;

    beforeEach(() => {
        id = chance.guid();

        projectData = {
            name: chance.word(),
            description: chance.paragraph(),
        };

        updatedProject = projectData;

        Project.findByIdAndUpdate = jest.fn().mockReturnThis();
        Project.lean = jest.fn().mockReturnThis();
        Project.exec = jest.fn().mockResolvedValue(updatedProject);
    })

    test('should call Project.findByIdAndUpdate with the id and projectData and return document new property', async () => {
        // ACT
        await ProjectService.updateProject(id, projectData);

        // ASSERT
        expect(Project.findByIdAndUpdate).toHaveBeenCalledWith(id, projectData, {
            new: true,
            runValidators: true
        });
    })

    test('should call project.lean', async () => {
        // ACT
        await ProjectService.updateProject(id, projectData);

        // ASSERT
        expect(Project.lean).toBeCalled();
    })

    test('should call project.exec', async () => {
        // ACT
        await ProjectService.updateProject(id, projectData);

        // ASSERT
        expect(Project.exec).toBeCalled();
    })

    test('should return the updated project', async () => {
        // ACT
        const result = await ProjectService.updateProject(id, projectData);

        // ASSERT
        expect(result).toEqual(updatedProject);
    })
})