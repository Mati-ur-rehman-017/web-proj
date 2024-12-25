import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import app from '../server.js'; // Assuming your main file is index.js

describe('Express App Tests', () => {
    before(async () => {
        // Only connect if not already connected
        if (mongoose.connection.readyState === 0) {
          await mongoose.connect(process.env.DB);
        }
      });
    
      after(async () => {
        // Clean up collections instead of dropping database
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
          await collection.deleteMany({});
        }
      });
    
    
 
  

  // Item Route Tests
  describe('Item Routes', () => {
    it('GET /api/item should return items list', async () => {
      const response = await request(app)
        .get('/api/item')
        .expect(200);

      expect(response.body).to.be.an('array');
    });
  });

  // Error Handling Tests
  describe('Error Handling', () => {
    it('should handle 404 routes', async () => {
      await request(app)
        .get('/api/nonexistent')
        .expect(404);
    });

   
  });

  // Database Connection Test
  describe('Database Connection', () => {
    it('should connect to MongoDB', () => {
      expect(mongoose.connection.readyState).to.equal(1);
    });
  });

  // CORS Test
  describe('CORS Configuration', () => {
    it('should allow requests from allowed origin', async () => {
      const response = await request(app)
        .options('/api/users')
        .set('Origin', 'http://localhost:5173');

      expect(response.headers['access-control-allow-origin'])
        .to.equal('http://localhost:5173');
    });
  });
});