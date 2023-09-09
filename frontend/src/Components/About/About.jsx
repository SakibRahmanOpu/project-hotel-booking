import React, { useEffect } from "react";
import "./about.css";
import Aos from "aos";
import img from "../../assets/Bali.jpg";
import img1 from "../../assets/download.jpeg";
import img2 from "../../assets/Delivering-Personalized-Customer-Service.avif";
import video from "../../assets/hotel.mp4";

const About = () => {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  return (
    <section className="about section">
      <div className="secContainer">
        <h2 data-aos="fade-up" data-aos-duration="1000" className="title">
          Why Hotel Booking?
        </h2>
        <div className="mainContent container grid">
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="singleItem"
          >
            <img src={img} alt="Hotels" />
            <h3> 100+ HOTELS</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem,
              ipsa.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="2500"
            className="singleItem"
          >
            <img src={img1} alt="VIP Rooms" />
            <h3> 1000+ VIP Rooms</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem,
              ipsa.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="3000"
            className="singleItem"
          >
            <img src={img2} alt="Customers" />
            <h3> 20000+ Customers</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem,
              ipsa.
            </p>
          </div>
        </div>
        <div className="videoCard container">
          <div className="cardContent grid">
            <div
              data-aos="fade-right"
              data-aos-duration="2000"
              className="cardText"
            >
              <h2> Wonderful Experience With Hotel Booking</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
                recusandae eos eveniet sunt aspernatur cupiditate.
              </p>
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="2000"
              className="cardVideo"
            >
              <video src={video} autoPlay loop muted type="video/mp4"></video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
