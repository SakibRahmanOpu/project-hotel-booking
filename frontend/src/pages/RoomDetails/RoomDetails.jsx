import React, { useRef, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiDollar, BiGroup } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Alert, Col, Container, Form, ListGroup, Row } from "reactstrap";
import Book from "../../Components/Book/Book";
import CommonSection from "../../Components/CommonSection/CommonSection";
import avater from "../../assets/Bali.jpg";
import useFetch from "../../hooks/useFetch";
import { postData } from "../../utils/api";
import calcuateAvgRating from "../../utils/avgRating";
import { BASE_URL } from "../../utils/config";
import "./RoomDetails.scss";

const Details = () => {
  const { hotelId, roomId } = useParams();
  const [hotelRating, setHotelRating] = useState(0);
  const reviewMsgRef = useRef("");
  // const [hotelDetails, setHotelDetails] = useStat(null);
  const { data, error, loading, fetchData } = useFetch(
    `${BASE_URL}/rooms/${roomId}`
  );
  console.log(data);

  if (!data) {
    return (
      <>
        <CommonSection title={""} />
        <Alert color="danger" className="text-center hotel-details-error">
          Oops! Error loading hotel details!
        </Alert>
      </>
    );
  }

  const { photo, title, desc, price, reviews, address, city, maxGroupSize } =
    data;
  const { totalRating, avgRating } = calcuateAvgRating(reviews);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      const data = await postData(`${BASE_URL}/review/${roomId}`, {
        reviewText,
        rating: hotelRating,
      });
      console.log(data);
      fetchData();
      toast.success("Review added successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <section className="hoteldetails">
        <CommonSection title={""} />
        <Container>
          <Row>
            <Col lg="8">
              <div className="detail_content">
                <img src={photo} alt={title} />
                <div className="details_info">
                  <h2>{title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className=" hotel_rating d-flex align-items-center gap-1">
                      <AiFillStar
                        className="i"
                        style={{ color: "var(--secondaryColor)" }}
                      />
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "NotRated"
                      ) : (
                        <span> ({reviews?.length})</span>
                      )}
                      <span>
                        <FaMapMarkerAlt /> {address}
                      </span>
                    </span>
                  </div>
                  <div className="extra_details">
                    <span>
                      <FaMapMarkerAlt /> {city}
                    </span>
                    <span>
                      <BiDollar /> {price}
                    </span>
                    <span>
                      <BiGroup /> {maxGroupSize}
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>
                <div className="hotel_reviews mt-4">
                  <h4> Reviews ({reviews?.length} reviews)</h4>
                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating_group">
                      <span onClick={() => setHotelRating(1)}>
                        {hotelRating >= 1 ? <AiFillStar /> : <AiOutlineStar />}
                      </span>
                      <span onClick={() => setHotelRating(2)}>
                        {hotelRating >= 2 ? <AiFillStar /> : <AiOutlineStar />}
                      </span>
                      <span onClick={() => setHotelRating(3)}>
                        {hotelRating >= 3 ? <AiFillStar /> : <AiOutlineStar />}
                      </span>
                      <span onClick={() => setHotelRating(4)}>
                        {hotelRating >= 4 ? <AiFillStar /> : <AiOutlineStar />}
                      </span>
                      <span onClick={() => setHotelRating(5)}>
                        {hotelRating >= 5 ? <AiFillStar /> : <AiOutlineStar />}
                      </span>
                    </div>
                    <div className="review_input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="Share your thoughts"
                        required
                      />
                      <button
                        className="btn primary_btn text-white "
                        type="submit"
                      >
                        submit
                      </button>
                    </div>
                  </Form>
                  <ListGroup className="user_reviews">
                    {reviews?.map((review, index) => (
                      <div key={index} className="review_item">
                        <img src={avater} alt="" />
                        <pre></pre>
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username ?? "User"}</h5>
                            </div>
                            <p>
                              {new Date(review.createdAt).toLocaleDateString(
                                "en-US",
                                options
                              )}
                            </p>
                          </div>
                          <span className="d-flex align-items-center">
                            {review.rating} <AiFillStar />
                          </span>
                        </div>
                        <h6>{review.reviewText}</h6>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>
            <Col lg="4">
              <Book tour={data} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Details;
