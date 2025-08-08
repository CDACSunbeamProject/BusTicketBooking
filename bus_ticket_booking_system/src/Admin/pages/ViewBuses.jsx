import React, { useEffect, useState } from "react";
import { fetchAllBuses, deleteBusById } from "../services/busService";
import {
  FaBus,
  FaChair,
  FaClock,
  FaMoneyBillWave,
  FaStar,
  FaUserTie,
  FaCalendarAlt,
} from "react-icons/fa";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

function ViewBuses() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadBuses = async () => {
      try {
        const data = await fetchAllBuses(token);
        setBuses(data);
      } catch (err) {
        setError("Failed to load buses");
        console.error("Error loading buses:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBuses();
  }, [token]);

  const handleDelete = async (busId,token) => {
    if (!window.confirm(`Are you sure you want to delete bus "${busId}"?`)) {
      return;
    }
    setLoading(true);
    try {
      await deleteBusById(busId, token);
      setBuses(buses.filter((bus) => bus.busId !== busId));
    } catch (err) {
      setError("Failed to delete bus");
      console.error("Delete bus error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (busId) => {
    navigate(`/buses/getbus/${busId}`);
  };

  if (loading) return <div className="text-center my-5">Loading buses...</div>;
  if (error)
    return <div className="alert alert-danger text-center my-5">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">
          <FaBus className="me-2" />
          Available Buses
        </h2>
      </div>

      <div className="row g-4">
        {buses.map((bus) => (
          <div key={bus.busName} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{bus.busName}</h5>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <FaUserTie className="text-muted me-2" />
                  <span>{bus.operatorName}</span>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <FaBus className="text-muted me-2" />
                      <span>{bus.busType}</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <FaChair className="text-muted me-2" />
                      <span>{bus.seatType}</span>
                    </div>
                  </div>
                </div>

                {/* Departure Date and Time */}
                <div className="row mb-3">
                  {/* <div className="col-6 d-flex align-items-center">
                    <FaCalendarAlt className="text-muted me-2" />
                    <strong>Departure Date:</strong>&nbsp;
                    <span>{bus.departureDate || "N/A"}</span>
                  </div> */}
                  <div className="col-6 d-flex align-items-center">
                    <FaClock className="text-muted me-2" />
                    <strong>Departure Time:</strong>&nbsp;
                    <span>{bus.departureTime || "N/A"}</span>
                  </div>
                </div>

                {/* Arrival Date and Time */}
                <div className="row mb-3">
                  {/* <div className="col-6 d-flex align-items-center">
                    <FaCalendarAlt className="text-muted me-2" />
                    <strong>Arrival Date:</strong>&nbsp;
                    <span>{bus.arrivalDate || "N/A"}</span>
                  </div> */}
                  <div className="col-6 d-flex align-items-center">
                    <FaClock className="text-muted me-2" />
                    <strong>Arrival Time:</strong>&nbsp;
                    <span>{bus.arrivalTime || "N/A"}</span>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6 d-flex align-items-center">
                    <FaMoneyBillWave className="text-muted me-2" />
                    <span>₹{bus.price}</span>
                  </div>
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <div className="badge bg-light text-dark">
                      {bus.noOfSeats - (bus.bookedSeats?.length || 0)}/
                      {bus.noOfSeats} seats available
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <FaStar className="text-warning me-2" />
                    <span>{bus.rating || "N/A"}</span>
                  </div>

                  {/* Buttons at bottom */}
                  <div>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => handleView(bus.busId)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(bus.busId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewBuses;
