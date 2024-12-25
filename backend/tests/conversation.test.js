// import { expect } from "chai";
// import request from "supertest";
// import mongoose from "mongoose";
// import app from "../server.js";
// import Conversation from "../models/conversation.model.js";
// import jwt from "jsonwebtoken";

// describe("Conversation Controller Tests", () => {
//   let sellerId, buyerId;
//   let authTokenSeller, authTokenBuyer;
//   let conversation;

//   beforeEach(async () => {
//     await Conversation.deleteMany({}); // Clear the collection

//     // Mock ObjectIds for users
//     sellerId = mongoose.Types.ObjectId();
//     buyerId = mongoose.Types.ObjectId();

//     // Mock JWT tokens
//     authTokenSeller = jwt.sign({ id: sellerId, isSeller: true }, process.env.JWT_KEY);
//     authTokenBuyer = jwt.sign({ id: buyerId, isSeller: false }, process.env.JWT_KEY);

//     // Create a test conversation
//     conversation = await Conversation.create({
//       id: `${sellerId}${buyerId}`, // Unique ID format
//       sellerId,
//       buyerId,
//       readBySeller: true,
//       readByBuyer: false,
//       lastMessage: "Hello, this is the last message.",
//     });
//   });

//   describe("POST /api/conversations", () => {
//     it("should create a new conversation", async () => {
//       const res = await request(app)
//         .post("/api/conversations")
//         .set("Cookie", `accessToken=${authTokenSeller}`)
//         .send({ to: buyerId })
//         .expect(201);

//       expect(res.body).to.have.property("id", `${sellerId}${buyerId}`);
//       expect(res.body).to.have.property("sellerId").that.equals(sellerId.toString());
//       expect(res.body).to.have.property("buyerId").that.equals(buyerId.toString());
//       expect(res.body).to.have.property("readBySeller", true);
//       expect(res.body).to.have.property("readByBuyer", false);
//     });

//     it("should return 400 if 'to' field is missing", async () => {
//       const res = await request(app)
//         .post("/api/conversations")
//         .set("Cookie", `accessToken=${authTokenSeller}`)
//         .send({})
//         .expect(400);

//       expect(res.body).to.have.property("message", "Bad Request");
//     });
//   });

//   describe("GET /api/conversations", () => {
//     it("should fetch conversations for the seller", async () => {
//       const res = await request(app)
//         .get("/api/conversations")
//         .set("Cookie", `accessToken=${authTokenSeller}`)
//         .expect(200);

//       expect(res.body).to.be.an("array").that.is.not.empty;
//       expect(res.body[0]).to.have.property("sellerId").that.equals(sellerId.toString());
//     });

//     it("should fetch conversations for the buyer", async () => {
//       const res = await request(app)
//         .get("/api/conversations")
//         .set("Cookie", `accessToken=${authTokenBuyer}`)
//         .expect(200);

//       expect(res.body).to.be.an("array").that.is.not.empty;
//       expect(res.body[0]).to.have.property("buyerId").that.equals(buyerId.toString());
//     });
//   });
// })