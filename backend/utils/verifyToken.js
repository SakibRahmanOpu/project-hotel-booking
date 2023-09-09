import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not authenticated",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    console.log("Verify Token -- User", user);
    const dbUser = await User.findById(user.id);
    console.log("Verify Token -- Database User", dbUser);
    req.user = dbUser;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  console.log("USER");
  if (req.user.role === "user" || req.user.role === "admin") {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "You are not authenticated",
    });
  }
};

export const verifyAdmin = (req, res, next) => {
  console.log("ADMIN");
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "You are not authorized",
    });
  }
};
