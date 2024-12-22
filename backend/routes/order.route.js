import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, createOrder ,deleteOrder,myOrder} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/my/",myOrder);
router.delete("/:id", deleteOrder);
router.post("/",createOrder);

export default router;
