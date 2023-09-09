import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import DatePicker from "react-datepicker";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { postData } from "../../utils/api";
import { BASE_URL } from "../../utils/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./PayWithStripe.scss";
import dateDiffInDays from "../../utils/calculate";

const PayWithStripe = ({
  price,
  modal,
  setModal,
  guestSize,
  hotelName,
  modalId = null,
  // startDate,
  // endDate,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [priceState, setPriceState] = useState(price);
  const navigate = useNavigate();
  const handleToggle = () => setModal((prevState) => !prevState);

  useEffect(() => {
    if (startDate.getTime() > endDate.getTime()) {
      // const days = dateDiffInDays(startDate, endDate);
      setEndDate(startDate);
      setPriceState(price * 1);
    } else {
      const days = dateDiffInDays(startDate, endDate);
      setPriceState(price * (days + 1));
    }
  }, [startDate, endDate]);

  const onToken = async (token) => {
    try {
      const data = await postData(`${BASE_URL}/payment`, {
        stripeToken: token,
        amount: priceState * 100,
        guestSize,
        hotelName,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
      if (data?.success) {
        toast.success("Payment Successfull!");
        setModal(false);
        navigate("/dashboard/my-bookings");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error making payment! Try again later!");
    }
  };
  return (
    <div>
      {/* <Button color="danger" onClick={handleToggle}>
        Click Me
      </Button> */}
      <Modal
        centered
        isOpen={modal && modalId === null ? true : modalId === modal}
        toggle={handleToggle}
      >
        <ModalHeader toggle={handleToggle}>Complete your Payment</ModalHeader>
        <ModalBody>
          <h2 className="text-center">Your total Price is: ৳{priceState}</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <div>
              <span className="check">Check In:</span>
              <DatePicker className="date-picker"
                showIcon
                selected={startDate}
                minDate={new Date()}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div>
              <span>Check Out:</span>
              < DatePicker  className="date-picker"
                showIcon
                minDate={startDate}
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <StripeCheckout
            stripeKey="pk_test_51LwTKSL6eDW1c9Y4lb8BBNrLgvdafmKaabjCeMPprnG9sGWLXv0KtdhOueSOo5GCZrkmyx5oCsLlZ7bTN4Wnr75u00zs1LSFHb"
            amount={priceState * 100}
            label="Complete Payment"
            name="Hotel Booking System"
            token={onToken}
            currency="BDT"
          />
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PayWithStripe;
