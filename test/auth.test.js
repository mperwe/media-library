const request = require('supertest')
const app = require('../index');


describe('login endpoint', () => {
    test('test shoul return token', async () => {
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

    describe('register endpoint', () => {
      test('test shoul return token', async () => {
        const res = await request(app)
          .post('/api/v1/users/signup')
          .send(
            {
              "username": "code25677",
              "email": "code256777@gmail.com",
              "password": "code258677"
          }
          )
        expect(res.statusCode).toEqual(201)
      })
    })

  })