import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBooking,
  getBooking,
  getBookingByUserId,
} from "../controllers/bookingController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.post("/", verifyUser, createBooking);
// router.get("/:id", verifyUser, getBooking);
// router.get("/", getAllBooking);
router.get("/", verifyToken, verifyUser, getBookingByUserId);
router.post("/delete/:id", verifyToken, verifyUser, deleteBooking);

export default router;
