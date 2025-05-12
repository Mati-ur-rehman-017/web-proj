import request from 'supertest';
import app from '../server.js';
import Item from '../models/item.model.js';
import mongoose from 'mongoose';

// Ensure DB connection before tests
beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.DB);
  }
});

afterAll(async () => {
  // Clean up DB and close connection
  await Item.deleteMany({});
  await mongoose.connection.close();
});

describe('Item Controller Tests', () => {
  let testItem;
  const testItemData = {
    itemName: 'Test Item',
    userId: new mongoose.Types.ObjectId(),
    userName: 'testUser',
    img: 'test.jpg',
    price: 100,
    description: 'Test description',
    category: 'electronics'
  };

  beforeEach(async () => {
    await Item.deleteMany({});
    testItem = await Item.create(testItemData);
  });

  describe('POST /api/item', () => {
    test('creates new item', async () => {
      const newItem = {
        ...testItemData,
        itemName: 'New Test Item',
        userId: new mongoose.Types.ObjectId()
      };

      const res = await request(app)
        .post('/api/item')
        .send(newItem);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('itemName', 'New Test Item');
      expect(res.body).toHaveProperty('price', 100);
    });

    test('fails with invalid data', async () => {
      const invalidItem = { itemName: 'Invalid' };
      const res = await request(app)
        .post('/api/item')
        .send(invalidItem);
      expect(res.status).toBe(500);
    });
  });

  describe('GET /api/item', () => {
    test('gets all items', async () => {
      const res = await request(app)
        .get('/api/item');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);
    });
  });

  describe('GET /api/item/:id', () => {
    test('gets item by id', async () => {
      const res = await request(app)
        .get(`/api/item/${testItem._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('itemName', testItem.itemName);
    });

    test('returns 404 for non-existent item', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/api/item/${fakeId}`);
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/item/:id', () => {
    test('deletes item', async () => {
      const res = await request(app)
        .delete(`/api/item/${testItem._id}`);

      expect(res.status).toBe(200);
      const deletedItem = await Item.findById(testItem._id);
      expect(deletedItem).toBeNull();
    });
  });

  describe('GET /api/item/user/:userId', () => {
    test('gets items by userId', async () => {
      const res = await request(app)
        .get(`/api/item/user/${testItem.userId}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toHaveProperty('userId', testItem.userId.toString());
    });

    test('returns empty array for non-existent user', async () => {
      const fakeUserId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/api/item/user/${fakeUserId}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(0);
    });
  });
});
