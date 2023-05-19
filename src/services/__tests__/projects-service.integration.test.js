const request = require('supertest');
const { app, start } = require('../../../app');
const Project = require('../../models/projects');

const mongoose = require('mongoose');
let server;

beforeAll(async () => {
    server = await start(process.env.TEST_PORT || 8004, process.env.MONGO_TEST_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
});

describe("GET /projects", () => {
    const projectOne = {
        name: "Project one",
        projectLink: "project.one.com",
        description: "This is a first project",
        overview: "a brief overview of the project",
        imageUrl: "project.one.com/image.png",
        tools: ["HTML", "CSS", "Java"],
    };

    const projectTwo = {
        name: "Project two",
        projectLink: "project.two.com",
        description: "This is the second project",
        overview: "a brief overview of the project",
        imageUrl: "project.two.com/image.png",
        tools: ["HTML", "Python", "Express"],
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