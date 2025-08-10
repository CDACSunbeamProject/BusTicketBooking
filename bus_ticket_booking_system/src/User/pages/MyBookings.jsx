/*import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
function MyBookings() {
  const [bookings, setBookings] = useState([
    {
      busNo: "KA-06-5678",
      from: "Pune",
      to: "Hyderabad",
      date: "2023-10-01",
      seatsCount: "02",
      price: 1000,
    },
    {
      busNo: "MH-14-1234",
      from: "Hyderabad",
      to: "Bangalore",
      date: "2023-10-02",
      seatsCount: "03",
      price: 1800,
    },
    {
      busNo: "AP-26-9101",
      from: "Bangalore",
      to: "Pune",
      date: "2023-10-03",
      seatsCount: "03",
      price: 1700,
    },
    {
      busNo: "MH-04-1121",
      from: "Mumbai",
      to: "Hyderabad",
      date: "2023-10-04",
      seatsCount: "01",
      price: 800,
    },
  ]);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/user");
  };
  return (
    <div className="container-sm medium-size-page mt-5 mb-5 bg-light border shadow rounded-4">
      <div className="row justify-content-center align-items-center text-center">
        <div className="fs-4 rounded-top-4 header-color pt-2 pb-3 fw-medium p-2 text-white">
          My Bookings
        </div>
      </div>
      <div>
        <div className="row m-5 mb-3 p-1 justtify-content-center align-items-center text-center">
          <div className="border border-dark m-0 p-0">
            <table className="table m-0 border-dark shadow text-center">
              <thead>
                <tr className=" border-dark table-primary align-middle">
                  <th>No.</th>
                  <th>Bus Number</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Date</th>
                  <th>No. Seats Booked</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody className="table-bordered table">
                {bookings.map((booking, index) => (
                  <tr key={index} className="align-middle bg-white">
                    <td className="col">{index + 1}</td>
                    <td className="col">{booking.busNo}</td>
                    <td className="col">{booking.from}</td>
                    <td className="col">{booking.to}</td>
                    <td className="col">{booking.date}</td>
                    <td className="col">{booking.seatsCount}</td>
                    <td className="col">{booking.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row mt-3 mb-5 justify-content-center align-items-center text-center">
          <div className="d-grid col-2">
            <button className="btn fw-bold btn-warning" onClick={handleBack}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
*/
//export default MyBookings;
/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MyBookings = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    console.log("user id"+id);
    axios
      .get(`http://localhost:9090/booking/user/${id}`)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Bookings</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Bus Name</th>
            <th>Bus No</th>
            <th>Bus Type</th>
            <th>Seat Type</th>
            <th>Operator</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Price</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.bookingId || "N/A"}</td>
                <td>{booking.bus?.busName}</td>
                <td>{booking.bus?.busNo}</td>
                <td>{booking.bus?.busType}</td>
                <td>{booking.bus?.seatType}</td>
                <td>{booking.bus?.operatorName}</td>
                <td>
                  {booking.bus?.departureDate} {booking.bus?.departureTime}
                </td>
                <td>
                  {booking.bus?.arrivalDate} {booking.bus?.arrivalTime}
                </td>
                <td>{booking.bus?.price}</td>
                <td>{booking.totalAmount}</td>
                <td>{booking.bookingStatus || "Pending"}</td>
                <td>{booking.paymentStatus || "Pending"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" style={{ textAlign: "center" }}>
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MyBookings = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, [id]);

  const fetchBookings = () => {
    axios
      .get(`http://localhost:9090/booking/user/${id}`)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
  };

  const cancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      axios
        .put(`http://localhost:9090/booking/cancel/${bookingId}`)
        .then(() => {
          alert("Booking cancelled successfully!");
          fetchBookings(); // refresh list
        })
        .catch((err) => {
          console.error("Error cancelling booking:", err);
          alert("Failed to cancel booking.");
        });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Bookings</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Bus Name</th>
            <th>Bus No</th>
            <th>Bus Type</th>
            <th>Seat Type</th>
            <th>Operator</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Price</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Action</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.bookingId || "N/A"}</td>
                <td>{booking.bus?.busName}</td>
                <td>{booking.bus?.busNo}</td>
                <td>{booking.bus?.busType}</td>
                <td>{booking.bus?.seatType}</td>
                <td>{booking.bus?.operatorName}</td>
                <td>
                  {booking.bus?.departureDate} {booking.bus?.departureTime}
                </td>
                <td>
                  {booking.bus?.arrivalDate} {booking.bus?.arrivalTime}
                </td>
                <td>{booking.bus?.price}</td>
                <td>{booking.totalAmount}</td>
                <td>{booking.bookingStatus || "Pending"}</td>
                <td>{booking.paymentStatus || "Pending"}</td>
                <td>
                  {booking.bookingStatus !== "Cancelled" ? (
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                      onClick={() => cancelBooking(booking.bookingId)}
                    >
                      Cancel
                    </button>
                  ) : (
                    "Cancelled"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13" style={{ textAlign: "center" }}>
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
