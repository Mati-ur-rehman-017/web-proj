import request from 'supertest';
import app from '../server.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

describe('User Controller Tests', () => {
  let testUser;
  let authToken;

  beforeEach(async () => {
    await User.deleteMany({});
    testUser = await User.create({
      username: 'testuser',
      email: 'test@test.com',
      password: 'password123',
      country: 'US'
    });
    authToken = jwt.sign(
      { id: testUser._id },
      process.env.JWT_KEY
    );
  });

  describe('DELETE /api/users/:id', () => {
    // Uncomment to test account deletion
    // it('should delete own account', async () => {
    //   await request(app)
    //     .delete(`/api/users/${testUser._id}`)
    //     .set('Cookie', `accessToken=${authToken}`)
    //     .expect(200);

    //   const deletedUser = await User.findById(testUser._id);
    //   expect(deletedUser).toBeNull();
    // });

    it('should not delete other user account', async () => {
      const otherUser = await User.create({
        username: 'otheruser',
        email: 'other@test.com',
        password: 'password123',
        country: 'UK'
      });

      await request(app)
        .delete(`/api/users/${otherUser._id}`)
        .set('Cookie', `accessToken=${authToken}`)
        .expect(403);
    });
  });

  // describe('GET /api/users/:id', () => {
  //   it('should get user by id', async () => {
  //     const res = await request(app)
  //       .get(`/api/users/${testUser._id}`)
  //       .expect(200);

  //     expect(res.body).toHaveProperty('username', 'testuser');
  //     expect(res.body).toHaveProperty('country', 'US');
  //   });
  // });
});
