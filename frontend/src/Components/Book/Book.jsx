import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import PayWithStripe from "../PayWithStripe/PayWithStripe";
import "./book.css";
import DatePicker from "react-datepicker";

const Book = ({ tour, avgRating }) => {
  const { title, desc, price, reviews, address, city, distance, maxGroupSize } =
    tour;
  const [modal, setModal] = useState(false);
  const [credentials, setCredentials] = useState({
    userId: "01",
    UserEmail: "example@gmail.com",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(credentials);
    setModal((prevState) => !prevState);
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(credentials.guestSize) + Number(serviceFee);
  return (
    <div className="booking">
      <div className="booking_top d-flex align-items-center justify-content-between">
        <h3>৳{price}</h3>

        <span className=" hotel_rating d-flex align-items-center gap-1">
          <AiFillStar className="i" />
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>
      {/* <div className="booking_form">
        <h5>INFORMATION</h5>
        <Form className="booking_info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="number"
              placeholder=" phone Number"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div> */}
      <div className="booking_bottom">
        <ListGroup>
          <ListGroupItem className="border-0  px-0">
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
          </ListGroupItem>
          <ListGroupItem className="border-0  px-0">
            <h5 className="d-flex align_item-center gap-1">Price</h5>
            <span>৳{price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0  px-0">
            <h5> Service Charge</h5>
            <span>৳{serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0  px-0 total">
            <h5> Total</h5>
            <span>৳{totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className=" w-100 mt-4" onClick={handleClick}>
          Book Room
        </Button>

        <PayWithStripe
          setModal={setModal}
          modal={modal}
          price={totalAmount}
          guestSize={maxGroupSize}
          hotelName={title}
          // startDate={startDate}
          // endDate={endDate}
        />
      </div>
    </div>
  );
};

export default Book;
