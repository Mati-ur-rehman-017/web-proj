import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';
import Order from '../models/order.model.js';
import jwt from 'jsonwebtoken';

describe('Order Controller Tests', () => {
  let testOrder;
  let authToken;
  let userId;

  beforeEach(async () => {
    await Order.deleteMany({});
    userId = '1234567890'; // Mock userId
    authToken = jwt.sign({ id: userId }, process.env.JWT_KEY);
  
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
    it('should fetch orders for a specific user', async () => {
      const res = await request(app)
        .get('/api/orders')
        .query({ userId })
        .set('Cookie', `accessToken=${authToken}`)
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.have.property('buyerId', userId);
    });

    it('should return an empty array if no orders found', async () => {
      const res = await request(app)
        .get('/api/orders')
        .query({ userId: 'nonexistentUserId' })
        .set('Cookie', `accessToken=${authToken}`)
        .expect(200);

      expect(res.body).to.be.an('array').that.is.empty;
    });
  });


  describe('POST /api/orders', () => {
    it('should create new orders', async () => {
      const newOrders = [
        {
          buyerId: userId, // Use the userId defined in beforeEach
          sellerId: '0987654321',
          itemName: 'Test Item',
          quantity: 1,
          payment_intent: 'test_intent_123',
          price: 100,
        },
      ];
  
      const res = await request(app)
        .post('/api/orders')
        .set('Cookie', `accessToken=${authToken}`)
        .send({ orders: newOrders })
        .expect(201);
  
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.have.property('buyerId', userId);
    });
  
    it('should return 400 if orders array is missing or invalid', async () => {
      const res = await request(app)
        .post('/api/orders')
        .send({ orders: null })
        .set('Cookie', `accessToken=${authToken}`)
        .expect(400);
  
      expect(res.body).to.have.property('message', 'Orders array is required.');
    });
  });
  

  describe('DELETE /api/orders/:id', () => {
    it('should delete an order by id', async () => {
      const res = await request(app)
        .delete(`/api/orders/${testOrder._id}`)
        .set('Cookie', `accessToken=${authToken}`)
        .expect(200);

      const deletedOrder = await Order.findById(testOrder._id);
      expect(deletedOrder).to.be.null;
    });

    it('should return 500 for non-existing order id', async () => {
      const res = await request(app)
        .delete('/api/orders/invalidOrderId')
        .set('Cookie', `accessToken=${authToken}`)
        .expect(500);

      expect(res.body).to.have.property('message', 'Error deleting order');
    });
  });
});
