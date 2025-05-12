import request from 'supertest';
import app from '../server.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

beforeAll(async () => {
  // Ensure DB is connected before tests
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.DB);
  }
});

afterAll(async () => {
  // Clean up DB and close connection
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Auth Controller Tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('Register', () => {
    const validUser = {
      username: 'testuser',
      email: 'test@test.com',
      password: 'password123',
      country: 'US'
    };

    test('creates a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(validUser);
      expect(res.status).toBe(201);

      const user = await User.findOne({ username: validUser.username });
      expect(user).toBeTruthy();
      expect(bcrypt.compareSync(validUser.password, user.password)).toBe(true);
    });

    test('fails if username already exists', async () => {
      await request(app).post('/api/auth/register').send(validUser);
      const res = await request(app)
        .post('/api/auth/register')
        .send(validUser);
      expect(res.status).toBe(500);
    });
  });

  describe('Login', () => {
    beforeEach(async () => {
      const hash = bcrypt.hashSync('password123', 5);
      await User.create({
        username: 'testuser',
        email: 'test@test.com',
        password: hash,
        country: 'US'
      });
    });

    test('logs in successfully with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'password123' });
      expect(res.status).toBe(200);
      expect(res.headers['set-cookie']).toBeDefined();
      expect(res.body).toHaveProperty('username', 'testuser');
      expect(res.body).not.toHaveProperty('password');
    });

    test('fails with wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'wrongpass' });
      expect(res.status).toBe(400); 
    });

    test('fails with non-existent user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'nonexistent', password: 'password123' });
      expect(res.status).toBe(404);
    });
  });

  describe('Logout', () => {
    test('clears the access token cookie', async () => {
      const res = await request(app).post('/api/auth/logout');
      expect(res.status).toBe(200);
      expect(res.headers['set-cookie'][0]).toContain('accessToken=;');
    });
  });

  describe('Update', () => {
    let userId;
    let token;

    beforeEach(async () => {
      const user = await User.create({
        username: 'testuser',
        email: 'test@test.com',
        password: bcrypt.hashSync('password123', 5),
        country: 'US'
      });
      userId = user._id;
      token = jwt.sign(
        { id: userId, isSeller: false },
        process.env.JWT_KEY
      );
    });

    test('updates user details', async () => {
      const updateData = { _id: userId, email: 'newemail@test.com' };
      const res = await request(app)
        .put('/api/auth/update')
        .set('Cookie', `accessToken=${token}`)
        .send(updateData);
      expect(res.status).toBe(200);
      expect(res.body.email).toBe('newemail@test.com');
      expect(res.body).not.toHaveProperty('password');
    });

    test('hashes password when updating password', async () => {
      const updateData = { _id: userId, password: 'newpassword123' };
      await request(app)
        .put('/api/auth/update')
        .set('Cookie', `accessToken=${token}`)
        .send(updateData)
        .expect(200);

      const updatedUser = await User.findById(userId);
      expect(bcrypt.compareSync('newpassword123', updatedUser.password)).toBe(true);
    });
  });
});