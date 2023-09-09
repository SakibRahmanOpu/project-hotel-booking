import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import avater from "../../assets/Bali.jpg";
import { useRef, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { Alert, Form, ListGroup } from "reactstrap";
import CommonSection from "../../Components/CommonSection/CommonSection";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import "./HotelDetails.scss";
import { postData } from "../../utils/api";
import { toast } from "react-toastify";

const Hotel = () => {
  const { id } = useParams();
  const [hotelRating, setHotelRating] = useState(0);
  const reviewMsgRef = useRef("");
  const { data, loading, error, fetchData } = useFetch(
    `${BASE_URL}/hotels/${id}`
  );
  console.log({ data, loading, error });

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      const data = await postData(`${BASE_URL}/review/${id}`, {
        reviewText,
        rating: hotelRating,
        hotel: true
      });
      toast.success("Review added successfully");
      fetchData();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading) return <Alert>Loading data...</Alert>;
  if (!loading && error) return <Alert color="danger">{error}</Alert>;

  return (
    <div>
      <CommonSection title={"Hotel Details"} />

      <div className="hotelContainer">
        <div className="hotelWrapper">
          <Link to={`/rooms/${data._id}`}>
            <button className="bookNow">View Rooms</button>
          </Link>
          <h1 className="hotelTitle">{data.title}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.city}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ৳114 at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {/* {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))} */}
            <div className="hotelImgWrapper">
              <img src={data.photo} alt="" className="hotelImg" />
            </div>
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.address}</h1>
              <p className="hotelDesc">{data.desc}</p>
            </div>
          </div>

          <div className="hotel_reviews mt-4">
            <h4> Reviews ({data.reviews?.length} reviews)</h4>
            <Form onSubmit={submitHandler}>
              <div className="d-flex align-items-center gap-3 mb-4 rating_group">
                <span onClick={() => setHotelRating(1)}>
                  {hotelRating >= 1 ? <AiFillStar /> : <AiOutlineStar />}
                </span>
                <span onClick={() => setHotelRating(2)}>
                  {hotelRating >= 2 ? <AiFillStar /> : <AiOutlineStar />}
                </span>
                <span onClick={() => setHotelRating(3)}>
                  {" "}
                  {hotelRating >= 3 ? <AiFillStar /> : <AiOutlineStar />}
                </span>
                <span onClick={() => setHotelRating(4)}>
                  {" "}
                  {hotelRating >= 4 ? <AiFillStar /> : <AiOutlineStar />}
                </span>
                <span onClick={() => setHotelRating(5)}>
                  {" "}
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
                <button className="btn primary_btn text-white " type="submit">
                  submit
                </button>
              </div>
            </Form>
            <ListGroup className="user_reviews">
              {data.reviews?.map((review, index) => (
                <div key={index} className="review_item">
                  <img src={avater} alt="" />
                  <pre></pre>
                  <div className="w-100">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        {" "}
                        <h5>{review.username ?? "User"}</h5>
                      </div>
                      <p>
                        {" "}
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US"
                          // options
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
      </div>
    </div>
  );
};

export default Hotel;
