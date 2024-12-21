import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm, createOrder ,deleteOrder} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getOrders);
router.delete("/:id", deleteOrder);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);
router.post("/",createOrder);

export default router;
