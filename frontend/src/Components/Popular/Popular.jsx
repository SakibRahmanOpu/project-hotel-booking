import React, { useEffect } from "react";
import Aos from "aos";
import { BsArrowLeftShort, BsArrowRightShort, BsDot } from "react-icons/bs";
import img1 from "../../assets/Bali.jpg";
import img2 from "../../assets/calofonia.webp";
import img3 from "../../assets/img3.webp";
import img4 from "../../assets/img4.webp";
import "./popular.css";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import { Link } from "react-router-dom";

const Data = [
  {
    id: 1,
    imgSrc: img1,
    destTitle: "Viceroy Chicago",
    location: "United State",
    address: "Chicago",
    grade: "CULTURAL RELAX",
  },
  {
    id: 2,
    imgSrc: img2,
    destTitle: " The Lowell",
    location: "United State",
    address: "New York",
    grade: "CULTURAL RELAX",
  },
  {
    id: 3,
    imgSrc: img3,
    destTitle: "The Langham",
    location: "United state",
    address: "Chicago",
    grade: "CULTURAL RELAX",
  },
  {
    id: 4,
    imgSrc: img4,
    destTitle: "Hotel Emma",
    location: "United State",

    address: "Texas",
    grade: "CULTURAL RELAX",
  },
  // {
  //     id:5,
  //     imgSrc:img5,
  //     destTitle:'Windsor Court Hotel',
  //     location: 'United State',
  //     address:'Chicago',
  //     grade:'CULTURAL RELAX'

  // },
];

const Popular = () => {
  const { data, loading, error } = useFetch(`${BASE_URL}/hotels/`);
  console.log(data);
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);
  return (
    <section className="popular section container">
      <div className="secContainer">
        <div className="secHeader flex">
          <div
            data-aos="fade-right"
            data-aos-duration="2500"
            className="textDiv"
          >
            <h2 className="secTitle">Popular Hotels</h2>
            <p> Planning a trip to poplar places?</p>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="2500"
            className="iconsDiv flex"
          >
            <BsArrowLeftShort className="icon leftIcon" />
            <BsArrowRightShort className="icon" />
          </div>
        </div>
        <div className="mainContent grid">
          {error && !loading && <div>{error}</div>}
          {!error && loading && <div>Loading...</div>}
          {data &&
            data
              .slice(0, 4)
              .map(({ _id: id, photo, title, city, address }, index) => {
                return (
                  <div
                    data-aos="fade-up"
                    className="singleDestination"
                    key={index}
                  >
                    <div className="destImage">
                      <img src={photo} alt="title" />
                      <div className="overlayInfo">
                        <h3>{title}</h3>
                        <p>{address}</p>

                        <Link to={`hotels/${id}`}>
                          <BsArrowRightShort className="icon" />
                        </Link>
                      </div>
                    </div>
                    <div className="destFooter">
                      {/* <div className="number">{id}</div> */}
                      <div className="destText flex ">
                        <h6>{city}</h6>
                        <span className="flex">
                          <span className="dot">
                            <BsDot className="icon" />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default Popular;
