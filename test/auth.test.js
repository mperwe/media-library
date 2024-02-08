const request = require('supertest')
const app = require('../index');


describe('login endpoint', () => {
    test('should return hello world object', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send(
            {
                email: 'code256@gmail.com',
                password: 'code256'
            }
        )
      expect(res.statusCode).toEqual(200)
    })
  })