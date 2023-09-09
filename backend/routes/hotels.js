import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getFeaturedHotel,
  getHotelBySearch,
  getHotelCount,
  getSingleHotel,
  updateHotel,
} from "../controllers/hotelController.js";

import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
const router = express.Router();
// router.get("/", (req,res)=>{
// res.send("Hello,this is auth")
// })
//create new room
// router.get("/register", (req,res)=>{
// res.send("Hello,this is auth register")
// })

// import multer from "multer";
// const upload = multer();

//create hotel
router.post("/", verifyToken, verifyAdmin, createHotel);
//update hotel
router.put("/:id", verifyToken, verifyAdmin, updateHotel);
//delete hotel
router.delete("/:id", verifyToken, verifyAdmin, deleteHotel);
//getSingle hotel
router.get("/:id", getSingleHotel);
//getAll hotel
router.get("/", getAllHotels);
//get all hotels by search
// router.get("/search/getHotelBySearch", getHotelBySearch);
// router.get("/search/getFeaturedHotels", getFeaturedHotel);
// router.get("/search/getHotelCount", getHotelCount);

export default router;
