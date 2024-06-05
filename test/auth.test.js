const request = require("supertest");
const app = require("../index");

const user = {
  username: "userNew5",
  email: "user5@gmail.com",
  password: "7685895869",
};

const updateUserInfo = { name: "user5" };

describe("test case Movie crud app", () => {
  let token = '';

  beforeAll(async () => {
    const response = await request(app).post("/api/v1/users/signup").send(user);
    token = response.body.token;
  });

  it("test case for getting all users", async () => {
    const response = await request(app).get("/api/v1/users").set('Authorization', `Bearer ${token}`);
    console.log('rrrr', response)
    expect(response.status).toBe(200);
  });

  it('test should login User', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send(
          {
              email: 'user5@gmail.com',
              password: '7685895869' 
          }
      )
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it("test case to update the user", async () => {
    const updateUser = await request(app).put(`/api/v1/users/edit/${user.email}`).send(updateUserInfo).set('Authorization', `Bearer ${token}`);
    expect(updateUser.status).toBe(200);
    expect(updateUser.body.name).toBe(updateUserInfo.name); 
  });

  it("test case for deleting the user", async () => {
    const deleteUser = await request(app).delete(`/api/v1/users/delete/${user.email}`).set('Authorization', `Bearer ${token}`);
    expect(deleteUser.status).toBe(204);
  });
});
