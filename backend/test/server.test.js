import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';

// Increase Jest timeout if needed
jest.setTimeout(20000);

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.DB);
  }
});

afterAll(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
  await mongoose.connection.close();
});

describe('Express App Tests', () => {
  // Item Route Tests
  describe('Item Routes', () => {
    test('GET /api/item should return items list', async () => {
      const response = await request(app).get('/api/item');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Error Handling Tests
  describe('Error Handling', () => {
    test('should handle 404 routes', async () => {
      await request(app).get('/api/nonexistent').expect(404);
    });
  });

  // Database Connection Test
  describe('Database Connection', () => {
    test('should connect to MongoDB', () => {
      expect(mongoose.connection.readyState).toBe(1);
    });
  });

  // CORS Test
  describe('CORS Configuration', () => {
    test('should allow requests from allowed origin', async () => {
      const response = await request(app)
        .options('/api/users')
        .set('Origin', 'http://localhost:5173');

      expect(response.headers['access-control-allow-origin']).toBe('http://localhost:5173');
    });
  });
});
