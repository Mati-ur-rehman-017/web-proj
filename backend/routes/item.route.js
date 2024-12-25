import express from "express";
import {
  createItem, 
  deleteItem, 
  getItemById, 
  getAllItems, 
  updateItem,
  getItemsByUserId
} from "../controllers/item.controller.js";  // Updated to match controller functions
import { verifyToken } from "../middleware/jwt.js";  // Middleware to verify JWT token

const router = express.Router();

// Route to create a new item
router.post("/",  createItem);

// Route to get all items
router.get("/", getAllItems);

// Route to get a single item by its ID
router.get("/:id", getItemById);

router.get('/user/:userId', getItemsByUserId);
// Route to update an item by its ID
router.put("/:id", verifyToken, updateItem);

// Route to delete an item by its ID
router.delete("/:id",deleteItem);

export default router;
