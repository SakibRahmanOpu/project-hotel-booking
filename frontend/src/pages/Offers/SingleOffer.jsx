import { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { FaWifi } from "react-icons/fa";
import {
  MdAirportShuttle,
  MdBathtub,
  MdKingBed,
  MdLocationOn,
} from "react-icons/md";
import PayWithStripe from "../../Components/PayWithStripe/PayWithStripe";
import DatePicker from "react-datepicker";

export const SingleOffer = ({ id, imgSrc, destTitle, location, price }) => {
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  return (
    <div data-aos="fade-up" data-aos-duration="3000" className="singleOffer">
      <div className="destImage">
        <img src={imgSrc} alt={destTitle} />
        <span className="discount">30% off</span>
      </div>
      <div className="offerBody">
        <div className="price flex">
          <h4>৳{price}</h4>
          <span className="status">Available</span>
        </div>
        <div className="amentities flex">
          <div className="singleAmenity flex">
            <MdKingBed className="icon" />
            <small>2 Beds</small>
          </div>
          <div className="singleAmenity flex">
            <MdBathtub className="icon" />
            <small>1 Bath</small>
          </div>
          <div className="singleAmenity flex">
            <FaWifi className="icon" />
            <small>Wifi</small>
          </div>
          <div className="singleAmenity flex">
            <MdAirportShuttle className="icon" />
            <small>Shuttle</small>
          </div>
        </div>
        <div className="location flex">
          <MdLocationOn className="icon" />
          <small className="location">{location}</small>
        </div>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          <div>
            <span>Check In:</span>
            <DatePicker
              showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div>
            <span>Check Out:</span>
            <DatePicker
              showIcon
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
        </div> */}
        <button
          className="btn flex"
          onClick={() => setModal((prevState) => (prevState ? false : id))}
        >
          Book Now
          <BsArrowRightShort className="icon" />
        </button>
      </div>
      <PayWithStripe
        setModal={setModal}
        modalId={id}
        modal={modal}
        price={price}
        guestSize={8}
        hotelName={destTitle}
        // startDate={startDate}
        // endDate={endDate}
      />
    </div>
  );
};
