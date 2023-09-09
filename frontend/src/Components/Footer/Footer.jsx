import React, { useEffect } from "react";
import "./footer.css";
import { FaHotel } from "react-icons/fa";
import { ImFacebook } from "react-icons/im";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import Aos from "aos";

const Footer = () => {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);
  return (
    <div className="footer">
      <div className="secContainer container grid">
        <div data-aos="fade-up" data-aos-duration="2000" className="logoDiv">
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="footerLogo"
          >
            <a href="#" className="logo flex">
              <h1 className="flex">
                <FaHotel className="icon" />
                Hotel Booking{" "}
              </h1>
            </a>
          </div>
          {/* <div
            data-aos="fade-up"
            data-aos-duration="3000"
            className="socials flex"
          >
            <ImFacebook className="icon" />
            <BsTwitter className="icon" />
            <AiFillInstagram className="icon" />
          </div> */}
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="3000"
          className="footerLinks"
        >
          <span className="linkTitle">Information</span>
          <li>
            <a href="#">Rooms</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Conditions</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="3500"
          className="footerLinks"
        >
          <span className="linkTitle">Contact Us</span>
          <span className="phone">+881212324443545</span>
          <span className="email">HotelBokking@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
