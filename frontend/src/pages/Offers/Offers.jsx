import Aos from "aos";
import React, { useEffect } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { FaWifi } from "react-icons/fa";
import {
  MdAirportShuttle,
  MdBathtub,
  MdKingBed,
  MdLocationOn,
} from "react-icons/md";
import CommonSection from "../../Components/CommonSection/CommonSection";
import {
  default as img,
  default as img1,
  default as img2,
} from "../../assets/Bali.jpg";
import "./Offers.scss";
import PayWithStripe from "../../Components/PayWithStripe/PayWithStripe";
import { SingleOffer } from "./SingleOffer";

const Offers = [
  {
    id: 1,
    imgSrc: img,
    destTitle: "Windsor Court Hotel",
    location: "United State",
    price: 400,
  },
  {
    id: 2,
    imgSrc: img1,
    destTitle: "Windsor Court Hotel",
    location: "United State",
    price: 300,
  },
  {
    id: 3,
    imgSrc: img2,
    destTitle: "Windsor Court Hotel",
    location: "United State",
    price: 200,
  },
];

const Offer = () => {
  const [modal, setModal] = React.useState(false);
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);
  return (
    <>
      <CommonSection title={"Special Offers get 30% off"} />

      <section className="offer container section">
        <div className="secContainer">
          <div data-aos="fade-up" data-aos-duration="2000" className="secIntro">
            <h2 className="secTitle">Special Offers</h2>
            <p className="">
              By Booking 90 Days Or More In Advance, You Can Get 30% Off On Your
              Rooms.
            </p>
          </div>
          <div className="mainContent grid">
            {Offers.map(({ id, imgSrc, destTitle, location, price }, index) => {
              return (
                <SingleOffer
                  id={id}
                  imgSrc={imgSrc}
                  destTitle={destTitle}
                  price={price}
                  location={location}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Offer;
