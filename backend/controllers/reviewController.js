import Hotel from "../models/Hotel.js";
import Review from "../models/Review.js";
import Room from "../models/Room.js";

export const createReview = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const newReview = new Review({ ...req.body, username: req.user.username });
  try {
    const savedReview = await newReview.save();

    // after creating a new review  then  update the  rivews arrays of hotels
    if (req.body.hotel) {
      const review = await Hotel.findByIdAndUpdate(id, {
        $push: {
          reviews: savedReview._id,
        },
      });
      console.log("Hotel", review);
    } else {
      const review = await Room.findByIdAndUpdate(id, {
        $push: {
          reviews: savedReview._id,
        },
      });
      console.log("Room", review);
    }

    res.status(201).json({
      success: true,
      message: "Review submitted",
      data: savedReview,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Review is not submitted",
    });
  }
};

export const getAllReviews = async (req, res) => {
  const hotelId = req.params.hotelId;
  try {
    // reviews = await Review.find({ hotel: hotelId });
    const reviews = await Review.find();
    console.log(reviews);
    res.status(200).json({
      success: true,
      message: "Reviews fetched",
      data: reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Reviews are not fetched",
    });
  }
};
