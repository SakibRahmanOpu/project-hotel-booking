import User from "../models/User.js";
//user register
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { json } from "express";

export const register = async (req, res) => {
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    console.log({ existingUser });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    //hasing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to create try again later",
    });
  }
};
//user login

export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    //if user not found
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }

    // if user exists check password
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect  email or Password",
      });
    }

    const { password, role, ...rest } = user._doc;
    //create jwt token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    //set token  in the browser cookies and send the response to the client
    res
      .cookie("accessToken", token)
      .status(200)
      .json({
        token,
        data: { ...rest },
        role,
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const signInWithGoogle = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log("100", user);
    if (!user) {
      // return res.status(400).json({
      //   success: false,
      //   message: "User already exists",
      // });
      console.log("Inside new user");
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        // password: hash,
        auth: "google",
        photo: req.body.photo,
        role: "user",
      });

      const savedUser = await newUser.save();
      console.log("user", savedUser);
      const token = jwt.sign(
        {
          id: savedUser._id,
          role: savedUser.role,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15d" }
      );
      //hasing password
      // const salt = bcrypt.genSaltSync(10);
      // const hash = bcrypt.hashSync(req.body.password, salt);
      const { role, ...rest } = savedUser._doc;

      return res.status(200).json({
        token,
        data: { ...rest },
        role,
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );
    //hasing password
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(req.body.password, salt);
    const { role, ...rest } = user._doc;

    res.status(200).json({
      token,
      data: { ...rest },
      role,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to create try again later",
    });
  }
};
