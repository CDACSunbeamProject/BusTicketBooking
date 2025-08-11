import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSpinner, FaEye, FaTrashAlt, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const loadInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/admin/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data);
      } catch (err) {
        setError("Failed to load bookings");
        console.error("Error loading bookings:", err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    loadInfo();
  }, [token]);

  const filteredBookings = bookings.filter((booking) =>
    Object.values(booking).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleViewDetails = (bookingId) => {
    navigate(`/admin/bookings/${bookingId}`);
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      await axios.delete(`http://localhost:9090/admin/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(
        bookings.filter((booking) => booking.bookingId !== bookingId)
      );
      toast.success("Booking deleted successfully");
    } catch (err) {
      console.error("Error deleting booking:", err);
      toast.error("Failed to delete booking");
    }
  };

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <FaSpinner className="fa-spin me-2" size={30} />
        <span>Loading bookings...</span>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center my-5">
        {error}
        <button
          className="btn btn-sm btn-outline-dark ms-3"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">All Booking Details</h2>
            <div className="input-group" style={{ width: "300px" }}>
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="card-body">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">
                {bookings.length === 0
                  ? "No bookings found"
                  : "No matching bookings found"}
              </h4>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover text-center">
                <thead className="table-info">
                  <tr>
                    <th>Booking Time</th>
                    <th>Booking ID</th>
                    <th>User Name</th>
                    <th>Bus No</th>
                    <th>No of Seats</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.bookingId}>
                      <td>{new Date(booking.bookingTime).toLocaleString()}</td>
                      <td>{booking.bookingId}</td>
                      <td>{booking.userName}</td>
                      <td>{booking.busNo}</td>
                      <td className="text-center">{booking.noOfSeats}</td>
                      <td>
                        <span
                          className={`badge ${
                            booking.bookingStatus === "CONFIRMED"
                              ? "bg-success"
                              : booking.bookingStatus === "CANCELLED"
                              ? "bg-danger"
                              : "bg-warning"
                          }`}
                        >
                          {booking.bookingStatus}
                        </span>
                      </td>
                      <td className="fw-bold">
                        ₹{booking.totalAmount.toFixed(2)}
                      </td>
                      {/* <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleViewDetails(booking.bookingId)}
                          >
                            <FaEye />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              handleDeleteBooking(booking.bookingId)
                            }
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card-footer text-muted">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </div>
      </div>
    </div>
  );
}

export default Bookings;
