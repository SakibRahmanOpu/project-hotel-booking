import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import bookingRoute from "./routes/bookings.js";
import hotelRoute from "./routes/hotels.js";
import paymentRoute from "./routes/payment.js";
import reviewRoute from "./routes/reviews.js";
import roomRoute from "./routes/rooms.js";
import userRoute from "./routes/users.js";
// import fileupload from "express-fileupload";
import multer from "multer";

const app = express();
// const SSLCommerzPayment = require('sslcommerz-lts')
dotenv.config();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: "*",
  Credential: true,
};

// const store_id = process.env.STORE_ID;
// const store_passwd = process.env.STORE_PASS;
// const is_live = false; //true for live, false for sandbox
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewURlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected To MongoDB");
  } catch (error) {
    console.log("Connection To MongoDB  failed");
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use(cookieParser());
// app.use(fileupload());
// app.use(multer());

app.use("/api/v1/rooms", roomRoute);
app.use("/api/v1/hotels", hotelRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/payment", paymentRoute);

app.listen(port, () => {
  connect();
  console.log("CONNECTED TO BACKEND.", port);
});
