import React, { useEffect, useState } from "react";
import { fetchAllBuses, deleteBusById } from "../services/BusService";
import {
  FaBus,
  FaChair,
  FaClock,
  FaMoneyBillWave,
  FaStar,
  FaUserTie,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaListUl,
  FaFlagCheckered,
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

  const handleDelete = async (busId) => {
    if (!window.confirm(`Are you sure you want to delete bus "${busId}"?`)) {
      return;
    }
    setLoading(true);
    try {
      await deleteBusById(busId, token);
      setBuses((prev) => prev.filter((bus) => bus.id !== busId));
    } catch (err) {
      setError("Failed to delete bus");
      console.error("Delete bus error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (busId) => {
    navigate(`/admin/bus/${busId}`);
  };

  if (loading) return <div className="text-center my-5">Loading buses...</div>;
  if (error)
    return <div className="alert alert-danger text-center my-5">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">
          <FaBus className="me-2 text-primary" />
          Available Buses
        </h2>
      </div>

      <div className="row g-4">
        {buses.map((bus) => (
          <div key={bus.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                {/* Bus Name */}
                <h5 className="mb-0 ms-lg-2">{bus.busName}</h5>

                {/* Operator */}
                <div className="d-flex me-lg-3 align-items-center">
                  <FaUserTie className="text-light me-2" />
                  <span>{bus.operatorName}</span>
                </div>
              </div>
              <div className="card-body">
                {/* Bus Type & Seat Type */}
                <div className="row mb-3">
                  <div className="col-6">
                    <FaBus className="text-muted me-2" />
                    {bus.busType}
                  </div>
                  <div className="col-6">
                    <FaChair className="text-muted me-2" />
                    {bus.seatType}
                  </div>
                </div>

                {/* Route */}
                <div className="row mb-3">
                  <div className=" col-6">
                    <FaMapMarkerAlt className="text-muted me-2" />
                    <strong>{bus.startLocation}</strong> →{" "}
                    <strong>{bus.endLocation}</strong>
                  </div>
                  {/* Rating */}
                  <div className=" col-6 d-flex align-items-center">
                    <FaStar className="text-warning me-2" />
                    {bus.rating || "N/A"}
                  </div>
                </div>

                {/* Dates & Times */}
                <div className="row mb-2">
                  <div className="col-6">
                    <FaCalendarAlt className="text-muted me-2" />
                    {bus.departureDate}
                  </div>
                  <div className="col-6">
                    <FaClock className="text-muted me-2" />
                    {bus.departureTime}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <FaFlagCheckered className="text-muted me-2" />
                    {bus.arrivalDate}
                  </div>
                  <div className="col-6">
                    <FaClock className="text-muted me-2" />
                    {bus.arrivalTime}
                  </div>
                </div>

                {/* Price & Seats */}
                <div className="row mb-3">
                  <div className="col-6">
                    <FaMoneyBillWave className="text-muted" />₹{bus.price}
                  </div>
                  <div className="col-6">
                    <div className="badge bg-light text-dark">
                      {bus.noOfSeats - (bus.bookedSeats?.length || 0)}/
                      {bus.noOfSeats} seats available
                    </div>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="d-flex justify-content-between">
                  <button
                    className="btn col-3 btn-sm btn-info"
                    onClick={() => handleView(bus.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn col-3 btn-sm btn-danger me-lg-5"
                    onClick={() => handleDelete(bus.id)}
                  >
                    Delete
                  </button>
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
