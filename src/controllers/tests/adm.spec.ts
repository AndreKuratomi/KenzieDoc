import { createConnection, getConnection } from "typeorm";
import { config } from "../../database";
import request from "supertest";
import app from "../../app";
import { IUserParams } from "../../types";

describe("Administrator tests", () => {
  beforeAll(async () => {
    await createConnection(config);
  });

  afterAll(async () => {
    const defaultConnection = getConnection("default");
    await defaultConnection.close();
  });

  const testUser = {
    name: "Administrator",
    email: "adm@mail.com",
    password: "adm123",
    isAdm: true,
  };

  const testProduct = {
    name: "Produto Teste",
    price: 0.01,
  };

  let token = "";
  let userId = "";
  let productId = "";
  let buyId = "";
  let userToSendEmail: string;

  it("Should create the new Adm in the database", async () => {
    const response = await request(app).post("/user").send(testUser);

    userId = response.body.id;

    expect(response.status).toBe(201);
  });

  it("Should be able to log in the new user", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "adm@mail.com", password: "adm123" });

    token = response.body.token;

    expect(response.status).toBe(200);
  });

  it("Should be able to get a list of all users", async () => {
    const response = await request(app)
      .get(`/user`)
      .set({ Authorization: `Bearer ${token}` });

    const users = response.body;
    userToSendEmail = users.find((user: IUserParams) => !user.isAdm);

    expect(response.status).toBe(200);
  });

  it("Should be able to register a new product", async () => {
    const response = await request(app)
      .post("/product")
      .set({ Authorization: `Bearer ${token}` })
      .send(testProduct);

    productId = response.body.id;

    expect(response.status).toBe(201);
  });

  it("Should be able to select a product by it's id", async () => {
    const response = await request(app).get(`/product/${productId}`);

    expect(response.status).toBe(200);
  });

  it("Should be able to get a list of all products", async () => {
    const response = await request(app).get("/product");

    expect(response.status).toBe(200);
  });

  it("Should be able to add product to cart", async () => {
    const response = await request(app)
      .post("/cart")
      .set({ Authorization: `Bearer ${token}` })
      .send({ userId: userId, productId: productId });

    expect(response.status).toBe(200);
  });

  it("Should be able to return user's cart", async () => {
    const response = await request(app)
      .get(`/cart/${userId}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
  });

  it("Should be able to get all carts list", async () => {
    const response = await request(app)
      .get(`/cart`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
  });

  it("Should be able to remove product from cart", async () => {
    const response = await request(app)
      .delete(`/cart/${productId}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
  });

  it("Should be able to buy the products from cart", async () => {
    const response = await request(app)
      .post("/buy")
      .set({ Authorization: `Bearer ${token}` });

    buyId = response.body.id;

    expect(response.status).toBe(200);
  });

  it("Should be able to return user's buy order", async () => {
    const response = await request(app)
      .get(`/buy/${buyId}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
  });

  it("Should be able to get a list of all buy orders", async () => {
    const response = await request(app)
      .get("/buy")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
  });

  it("Should be able to send e-mail to a user", async () => {
    const response = await request(app)
      .post("/email")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        userId: userToSendEmail,
        subject: "Email test",
        content: "Lorem ipsum dolor",
      });

    expect(response.status).toBe(200);
  });
  it("Should be able to send e-mail to the user with code to reset password", async () => {
    const response = await request(app).post("/recuperar").send({
      email: testUser.email,
    });

    expect(response.status).toBe(200);
  });
});
