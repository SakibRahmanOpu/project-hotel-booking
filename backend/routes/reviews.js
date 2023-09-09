import express from "express";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";
import {
  createReview,
  getAllReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/:id", verifyToken, verifyUser, createReview);

router.get("/:hotelId", getAllReviews);

export default router;
