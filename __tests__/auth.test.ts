import request from "supertest";
import app from "../index"; // Certifique-se de que o app é exportado do seu index.ts

describe("Auth API - Login", () => {
  it("deve retornar 404 se o e-mail não for encontrado", async () => {
    const response = await request(app).post("/users/login").send({
      email: "naoexiste@example.com",
      password: "123456",
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Usuário não encontrado" });
  });

  it("deve retornar 401 se a senha for inválida", async () => {
    const response = await request(app).post("/users/login").send({
      email: "user@example.com",
      password: "senhaerrada",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Credenciais inválidas" });
  });

  it("deve retornar 200 e um token se o login for bem-sucedido", async () => {
    const response = await request(app).post("/users/login").send({
      email: "user@example.com",
      password: "123456",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.token).toBeTruthy();
  });
});
