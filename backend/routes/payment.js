import express from "express";
import { payment } from "../controllers/paymentController.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/",verifyToken, verifyUser, payment);
export default router;
