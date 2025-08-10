import React, { useEffect, useState } from "react";
import axios from "axios";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9090/booking/bookings")
      .then((response) => {
        // Filter out bookings with missing bus data
        const validBookings = response.data.filter(
          (booking) => booking.bus && booking.bus.busName
        );
        setBookings(validBookings);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      await axios.delete(`http://localhost:9090/booking/${bookingId}`);
      // Remove deleted booking from state
      setBookings((prevBookings) =>
        prevBookings.filter((b) => b.bookingId !== bookingId)
      );
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div>
      <h2>All Bookings</h2>
      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Bus Name</th>
            <th>Bus No</th>
            <th>Operator</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Fare</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr key={`${booking.bus?.id || "bus"}-${index}`}>
                <td>{booking.bookingId || index + 1}</td>
                <td>{booking.bus?.busName}</td>
                <td>{booking.bus?.busNo}</td>
                <td>{booking.bus?.operatorName}</td>
                <td>
                  {booking.bus?.departureDate} {booking.bus?.departureTime}
                </td>
                <td>
                  {booking.bus?.arrivalDate} {booking.bus?.arrivalTime}
                </td>
                <td>{booking.bus?.price}</td>
                <td>
                  <button
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                    onClick={() => handleDelete(booking.bookingId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No bookings available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;
