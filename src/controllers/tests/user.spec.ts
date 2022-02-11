import { createConnection, getConnection } from "typeorm";
import { config } from "../../database";
import request from "supertest";
import app from "../../app";

describe("User tests", () => {
  beforeAll(async () => {
    await createConnection(config);
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  const testUser = {
    name: "David",
    email: "david@mail.com",
    password: "david123",
    isAdm: false,
  };

  let token = "";
  let userId = "";

  it("Should create the new user in the database", async () => {
    const response = await request(app).post("/user").send(testUser);

    userId = response.body.id;

    expect(response.status).toBe(201);
  });

  it("Should be able to log in the new user", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "david@mail.com", password: "david123" });

    token = response.body.token;

    expect(response.status).toBe(200);
  });

  it("Should be able to return user's information", async () => {
    const response = await request(app)
      .get(`/user/${userId}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
  });
});
