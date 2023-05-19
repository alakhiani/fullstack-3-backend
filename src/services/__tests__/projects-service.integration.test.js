const request = require('supertest');
const { app, start } = require('../../../app');
const Project = require('../../models/projects');

const mongoose = require('mongoose');

beforeAll(async () => {
    await start(process.env.TEST_PORT || 8004, process.env.MONGO_TEST_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

// describe('GET /projects', () => {
//     const projectOne = {
//         name: 'Project One',
//         projectLink: 'https://www.example.com',
//         description: 'Lorem ipsum',
//         overview: 'Lorem ipsum',
//         imageUrl: 'https://www.example.com/image.png',
//         tools: ['Lorem ipsum', 'Lorem ipsum ipsum'],
//     }

//     test('should return all projects in the database', async () => {
//         //await Project.deleteMany();
//         await Project.create(projectOne);

//         const response = await request(app).get('/projects');
//         expect(response.statusCode).toBe(200);
//         const projects = response.body.projects;
//         expect(Array.isArray(projects)).toBe(true);
//         expect(projects.length).toBe(1);
//         expect(projects).toEqual(
//             expect.arrayContaining([
//                 expect.objectContaining(projectOne)
//             ])
//         );
//     });
// });

describe("GET /projects", () => {
    const projectOne = {
        name: "Project one",
        projectLink: "projectone.com",
        description: "This is a first project",
        overview: "a brief overview of the project",
        imageUrl: "projectone.com/image.png",
        tools: ["HTML", "CSS", "Java"],
    };

    const projectTwo = {
        name: "Project two",
        projectLink: "projecttwo.com",
        description: "This is the second project",
        overview: "a brief overview of the project",
        imageUrl: "projecttwo.com/image.png",
        tools: ["HTML", "Python"],
    };

    it("should return all projects in database", async () => {
        await Project.deleteMany();
        await Project.create(projectOne);
        await Project.create(projectTwo);

        const response = await request(app).get("/projects");
        expect(response.status).toBe(200);

        const projects = response.body.data;

        expect(Array.isArray(projects)).toBe(true);
        expect(projects.length).toEqual(2);
        expect(projects).toEqual(
            expect.arrayContaining([expect.objectContaining(projectOne)]),
            expect.arrayContaining([expect.objectContaining(projectTwo)])
        );
    });
});