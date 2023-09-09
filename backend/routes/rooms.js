import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRoom,
  getSingleRoom,
  updateRoom,
  getRoomByHotelId,
} from "../controllers/roomController.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//create room
router.post("/",verifyToken, verifyUser, createRoom);
//update room
router.put("/:id", updateRoom);
//delete hotel
router.delete("/:id", deleteRoom);
//getSingle hotel
router.get("/:id", getSingleRoom);

router.get("/hotel/:id", getRoomByHotelId);
//getAll hotel
router.get("/", getAllRoom);

export default router;
