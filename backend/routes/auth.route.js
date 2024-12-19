import express from "express";
import { register, login, logout, update } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update", update);

export default router;
