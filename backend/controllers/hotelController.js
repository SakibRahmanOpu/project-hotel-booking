import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  // return res.send("Hello,this is auth register");
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(201).json({
      success: true,
      message: "Successfully created",
      data: savedHotel,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create Try again later",
    });
  }
};

//update Hotels
export const updateHotel = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: updatedHotel,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update Try again later",
    });
  }
};
//delete Hotels
export const deleteHotel = async (req, res) => {
  const id = req.params.id;
  try {
    await Hotel.findByIdAndUpdate(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to Delete",
    });
  }
};
//getSingle Hotels
export const getSingleHotel = async (req, res) => {
  const id = req.params.id;
  try {
    const hotel = await Hotel.findByIdAndUpdate(id).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successfully Found",
      data: hotel,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};
//getAll Hotels
export const getAllHotels = async (req, res) => {
  console.log(req.query);
  if (Object.keys(req.query).length <= 0) {
    const page = parseInt(req.query.page);

    try {
      const hotels = await Hotel.find({}).populate("reviews");
      // .skip(page * 8)
      // .limit(8);

      res.status(200).json({
        success: true,
        count: hotels.length,
        message: "Successfull",
        data: hotels,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
  } else {
    try {
      const city = req.query.city;
      const distance = parseInt(req.query.distance);
      const maxGroupSize = parseInt(req.query.maxGroupSize);
      console.log({
        city,
        distance,
        maxGroupSize,
      });
      const hotels = await Hotel.find({
        $or: [
       { distance: { $gte: distance - 100, $lte: distance + 100 } },
       { maxGroupSize: { $lte: maxGroupSize } },
        {city: { $regex: city, $options: "i" }}, ],
      }).populate("reviews");

      console.log(hotels);
      res.status(200).json({
        success: true,
        message: "Successfull",
        data: hotels,
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
  }
  //pagination
};

//get hotel by search
export const getHotelBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i"); //here i is case sensitive
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);
  try {
    //here gte means greater then equal
    const hotels = await Hotel.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");

    res.status(200).json({
      success: true,

      message: "Successfull",
      data: hotels,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

//get featured Hotels
export const getFeaturedHotel = async (req, res) => {
  //pagination
  const page = parseInt(req.query.page);

  try {
    const hotels = await Hotel.find({ featured: true })
      .populate("reviews")

      .limit(8);

    res.status(200).json({
      success: true,

      message: "Successfull",
      data: hotels,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

// get hotel count
export const getHotelCount = async (req, res) => {
  try {
    const hotelCount = await Hotel.estimatedDocumentCount();

    res.status(200).json({
      success: true,

      message: "Successfull",
      data: hotelCount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Not  found",
    });
  }
};
