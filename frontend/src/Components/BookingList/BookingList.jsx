import { Table } from "reactstrap";
import "./BookingList.css";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { BASE_URL } from "../../utils/config";
import { FaSpinner, FaTrash } from "react-icons/fa";
import { postData } from "../../utils/api";
import { toast } from "react-toastify";
import formatAMPM from "../../utils/formatTime";

const DeleteButton = ({ id, fetchData }) => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async (id) => {
    setLoadingDelete(true);
    try {
      const response = await postData(`${BASE_URL}/booking/delete/${id}`, {});
      console.log(response);
      toast.success("Booking Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoadingDelete(false);
      fetchData();
    }
  };
  return (
    <div onClick={() => handleDelete(id)}>
      {loadingDelete ? <FaSpinner /> : <FaTrash />}
    </div>
  );
};

const BookingList = () => {
  // const [loadingDelete, setLoadingDelete] = useState(false);
  const { data, error, loading, fetchData } = useFetch(`${BASE_URL}/booking`);
  console.log(data);
  return (
    <>
      <h1 className="text-center my-4">All Booking History</h1>
      <Table responsive>
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Email</th>
            <th>Hotel Name</th>
            <th>Guest Size</th>
            <th>Amount</th>
            <th>Check In Date</th>
            <th>Check In Time</th>
            <th>Check Out Date</th>
            <th>Check Out Time</th>

            {/* <th>Receipt Url</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((booking, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{booking.userEmail}</td>
                <td>{booking.hotelName}</td>
                <td>{booking.guestSize}</td>
                <td className="bold">৳{Math.round(booking.amount / 100)}</td>
                <td>
                  {booking.startDate !== undefined
                    ? new Date(booking.startDate).toDateString()
                    : "N/A"}
                </td>
                <td>
                  {booking.endDate !== undefined
                    ? new Date(booking.endDate).toDateString()
                    : "N/A"}
                </td>
                <td> {formatAMPM(new Date(booking.startDate))}</td>
                <td> {formatAMPM(new Date(booking.endDate))}</td>
                {/* <td>
                  <a href={booking.receipt_url}>View Receipt</a>
                </td> */}
                <td className="booking-list-delete-button">
                  <DeleteButton id={booking._id} fetchData={fetchData} />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default BookingList;
