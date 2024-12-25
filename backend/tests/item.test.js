import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';
import Item from '../models/item.model.js';
import mongoose from 'mongoose';

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
    it('should create new item', async () => {
      const newItem = {
        ...testItemData,
        itemName: 'New Test Item',
        userId: new mongoose.Types.ObjectId()
      };

      const res = await request(app)
        .post('/api/item')
        .send(newItem)
        .expect(201);

      expect(res.body).to.have.property('itemName', 'New Test Item');
      expect(res.body).to.have.property('price', 100);
    });

    it('should fail with invalid data', async () => {
      const invalidItem = { itemName: 'Invalid' };
      await request(app)
        .post('/api/item')
        .send(invalidItem)
        .expect(500);
    });
  });

  describe('GET /api/item', () => {
    it('should get all items', async () => {
      const res = await request(app)
        .get('/api/item')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(1);
    });
  });

  describe('GET /api/item/:id', () => {
    it('should get item by id', async () => {
      const res = await request(app)
        .get(`/api/item/${testItem._id}`)
        .expect(200);

      expect(res.body).to.have.property('itemName', testItem.itemName);
    });

    it('should return 404 for non-existent item', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .get(`/api/item/${fakeId}`)
        .expect(404);
    });
  });

//   describe('PUT /api/item/:id', () => {
//     it('should update item', async () => {
//       const updateData = {
//         itemName: 'Updated Item',
//         price: 200
//       };

//       const res = await request(app)
//         .put(`/api/item/${testItem._id}`)
//         .send(updateData)
//         .expect(200);

//       expect(res.body).to.have.property('itemName', 'Updated Item');
//       expect(res.body).to.have.property('price', 200);
//     });

//     it('should return 404 for non-existent item', async () => {
//       const fakeId = new mongoose.Types.ObjectId();
//       await request(app)
//         .put(`/api/item/${fakeId}`)
//         .send({ itemName: 'Updated' })
//         .expect(404);
//     });
//   });

  describe('DELETE /api/item/:id', () => {
    it('should delete item', async () => {
      await request(app)
        .delete(`/api/item/${testItem._id}`)
        .expect(200);

      const deletedItem = await Item.findById(testItem._id);
      expect(deletedItem).to.be.null;
    });

  });

  describe('GET /api/item/user/:userId', () => {
    it('should get items by userId', async () => {
      const res = await request(app)
        .get(`/api/item/user/${testItem.userId}`)
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.have.property('userId', testItem.userId.toString());
    });

    it('should return empty array for non-existent user', async () => {
      const fakeUserId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/api/item/user/${fakeUserId}`)
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(0);
    });
  });
});