import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import "./HotelCard.scss";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const {
    _id: id,
    photo,
    title,
    desc,
    price,
    reviews,
    address,
    city,
    distance,
    maxGroupSize,
    avgRating,
  } = hotel;

  return (
    <div className="tour_card singleOffer">
      <Card>
        <div className="destImage">
          <img src={photo} alt={title} />
          <span>{title}</span>
        </div>
      </Card>
      <CardBody className="offerBody">
        <div className="card_top d-flex align-items-center justify-content-between">
          <span className=" tour_location d-flex align-items-center gap-1">
            {city}{" "}
          </span>
          <span className=" tour_rating d-flex align-items-center gap-1">
            {avgRating} {""}
          </span>
        </div>
        <h5 className="tour_title">
          {" "}
          <Link to={`/hotels/${id}`}>{title}</Link>
        </h5>
        <div className="card_bottom d-flex align-items-center justify-content-start mt-3 offerBody price flex">
          {/* <h5>{price}</h5> */}
          <Link to={`/rooms/${id}`}>
            <button className=" btn flex">View Rooms</button>
          </Link>
        </div>
      </CardBody>
    </div>
  );
};

export default HotelCard;
