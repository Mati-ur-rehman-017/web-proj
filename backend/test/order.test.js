import request from 'supertest';
import app from '../server.js';
import Order from '../models/order.model.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// Increase Jest timeout if needed
jest.setTimeout(20000);

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.DB);
  }
});

afterAll(async () => {
  await Order.deleteMany({});
  await mongoose.connection.close();
});

describe('Order Controller Tests', () => {
  let testOrder;
  let authToken;
  const userId = '1234567890';

  beforeEach(async () => {
    await Order.deleteMany({});
    authToken = jwt.sign({ id: userId, isSeller: false }, process.env.JWT_KEY);
    testOrder = await Order.create({
      buyerId: userId,
      sellerId: '0987654321',
      itemName: 'Test Item',
      quantity: 1,
      payment_intent: 'test_intent_123',
      price: 100,
    });
  });

  describe('GET /api/orders', () => {
    test('fetches orders for a specific user', async () => {
      const res = await request(app)
        .get('/api/orders')
        .query({ userId })
        .set('Cookie', `accessToken=${authToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toHaveProperty('buyerId', userId);
    });

    test('returns empty array if no orders found', async () => {
      const res = await request(app)
        .get('/api/orders')
        .query({ userId: 'nonexistent' })
        .set('Cookie', `accessToken=${authToken}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('POST /api/orders', () => {
    test('creates new orders', async () => {
      const newOrders = [{
        buyerId: userId,
        sellerId: '0987654321',
        itemName: 'Test Item',
        quantity: 1,
        payment_intent: 'test_intent_123',
        price: 100,
      }];
      const res = await request(app)
        .post('/api/orders')
        .set('Cookie', `accessToken=${authToken}`)
        .send({ orders: newOrders });
      expect(res.status).toBe(201);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toHaveProperty('buyerId', userId);
    });

    test('returns 400 if orders array is missing or invalid', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Cookie', `accessToken=${authToken}`)
        .send({ orders: null });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Orders array is required.');
    });
  });

  describe('DELETE /api/orders/:id', () => {
    test('deletes an order by id', async () => {
      const res = await request(app)
        .delete(`/api/orders/${testOrder._id}`)
        .set('Cookie', `accessToken=${authToken}`);
      expect(res.status).toBe(200);
      const deleted = await Order.findById(testOrder._id);
      expect(deleted).toBeNull();
    });

    test('returns 500 for non-existing order id', async () => {
      const res = await request(app)
        .delete('/api/orders/invalidId')
        .set('Cookie', `accessToken=${authToken}`);
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Error deleting order');
    });
  });
});