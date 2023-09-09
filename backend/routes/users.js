import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";
const router = express.Router();
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

//create User
router.post("/", verifyUser, createUser);

//update hotel
router.put("/:id", verifyUser, updateUser);

//delete User
router.delete("/:id", verifyUser, deleteUser);

//getSingle User
router.get("/:id", verifyUser, getSingleUser);

//getAll User
router.get("/", verifyAdmin, getAllUser);

export default router;
