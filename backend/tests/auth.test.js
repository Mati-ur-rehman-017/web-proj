import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

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

    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(validUser)
        .expect(201);

      const user = await User.findOne({ username: validUser.username });
      expect(user).to.exist;
      expect(bcrypt.compareSync(validUser.password, user.password)).to.be.true;
    });

    it('should fail if username already exists', async () => {
      await request(app).post('/api/auth/register').send(validUser);
      await request(app)
        .post('/api/auth/register')
        .send(validUser)
        .expect(500);
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

    it('should login successfully with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'password123'
        })
        .expect(200);

      expect(res.headers['set-cookie']).to.exist;
      expect(res.body).to.have.property('username', 'testuser');
      expect(res.body).to.not.have.property('password');
    });

    it('should fail with wrong password', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'wrongpass'
        })
        .expect(400);
    });

    it('should fail with non-existent user', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          username: 'nonexistent',
          password: 'password123'
        })
        .expect(404);
    });
  });

  describe('Logout', () => {
    it('should clear the access token cookie', async () => {
      const res = await request(app)
        .post('/api/auth/logout')
        .expect(200);

      expect(res.headers['set-cookie'][0]).to.include('accessToken=;');
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

    it('should update user details', async () => {
      const updateData = {
        _id: userId,
        email: 'newemail@test.com'
      };

      const res = await request(app)
        .put('/api/auth/update')
        .set('Cookie', `accessToken=${token}`)
        .send(updateData)
        .expect(200);

      expect(res.body.email).to.equal('newemail@test.com');
      expect(res.body).to.not.have.property('password');
    });

    it('should hash password when updating password', async () => {
      const updateData = {
        _id: userId,
        password: 'newpassword123'
      };

      await request(app)
        .put('/api/auth/update')
        .set('Cookie', `accessToken=${token}`)
        .send(updateData)
        .expect(200);

      const updatedUser = await User.findById(userId);
      expect(bcrypt.compareSync('newpassword123', updatedUser.password)).to.be.true;
    });
  });
});