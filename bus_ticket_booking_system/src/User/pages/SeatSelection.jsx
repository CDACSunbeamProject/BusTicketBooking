import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance";
import "./SeatSelection.css";

function SeatSelection() {
  const location = useLocation();
  const { busId } = location.state || {};
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [showPassengerForm, setShowPassengerForm] = useState(false);

  console.log("Bus ID from state:", busId);

  useEffect(() => {
    fetchBusAndSeats();
  }, [busId]);

  const fetchBusAndSeats = async () => {
    try {
      // Fetch bus details
      const busResponse = await axiosInstance.get(`/buses/getbus/${busId}`);
      console.log("Bus details:", busResponse.data);
      setBus(busResponse.data);

      // Fetch seats for this bus
      const seatsResponse = await axiosInstance.get(`/buses/${busId}/seats`);
      console.log("Seats data:", seatsResponse.data);
      setSeats(seatsResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bus and seats:", error);
      toast.error("Failed to load bus details");
      setLoading(false);
    }
  };

  const handleSeatClick = (seat) => {
    if (seat.status === "BOOKED") {
      toast.warning("This seat is already booked");
      return;
    }

    if (seat.status === "LOCKED") {
      toast.warning("This seat is currently locked");
      return;
    }

    const isSelected = selectedSeats.find(s => s.id === seat.id);

    if (isSelected) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      // Select seat
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleProceedToBooking = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }

    // Initialize passenger details for each selected seat
    const initialPassengerDetails = selectedSeats.map((seat, index) => ({
      seatNumber: seat.seatNumber,
      name: "",
      age: "",
      gender: "",
      phone: "",
      email: ""
    }));

    setPassengerDetails(initialPassengerDetails);
    setShowPassengerForm(true);
  };

  const handlePassengerDetailChange = (index, field, value) => {
    const updatedDetails = [...passengerDetails];
    updatedDetails[index][field] = value;
    setPassengerDetails(updatedDetails);
  };

  const handleBooking = async () => {
    // Validate passenger details
    for (let i = 0; i < passengerDetails.length; i++) {
      const passenger = passengerDetails[i];
      if (!passenger.name || !passenger.age || !passenger.gender || !passenger.phone) {
        toast.error(`Please fill all details for passenger ${i + 1}`);
        return;
      }
    }

    try {
      // Step 1: Lock seats on backend
      await axiosInstance.post(`/lock-multiple/user/${userId}`,
        selectedSeats.map(seat => seat.id) // send array only, not wrapped in object
      );


      // Step 2: Save booking data to localStorage (or state management)
      const bookingData = {
        busId: parseInt(busId),
        bus,
        selectedSeats,
        passengerDetails,
        totalAmount: selectedSeats.length * bus.price
      };
      localStorage.setItem("pendingBooking", JSON.stringify(bookingData));


      // Navigate to payment page
      navigate(`/user/payment`, { state: bookingData });
    } catch (error) {
      console.error("Error locking seats creating booking:", error);
      toast.error("Failed to lock seats booking. Try again");
    }
  };

  const getSeatStatusClass = (seat) => {
    if (selectedSeats.includes(seat.id)) {
    return "seat-selected"; // Green
  }
  if (seat.status === "LOCKED") {
    return "seat-locked"; // Red
  }
  if (seat.status === "AVAILABLE") {
    return "seat-available"; // Gray
  }
  return ""; // default
  };

  const getSeatStatusText = (seat) => {
    if (seat.status === "BOOKED") return "Booked";
    if (seat.status === "LOCKED") return "Locked";
    if (selectedSeats.find(s => s.id === seat.id)) return "Selected";
    return "Available";
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading seat layout...</p>
        </div>
      </div>
    );
  }

  if (!bus) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h4>Bus not found</h4>
          <button className="btn btn-primary" onClick={() => navigate("/user/home")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Bus Details Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="bus-details-header">
            <h3>{bus.busName}</h3>
            <div className="route-info">
              <span className="from">{bus.startLocation}</span>
              <span className="arrow">→</span>
              <span className="to">{bus.endLocation}</span>
            </div>
            <div className="bus-meta">
              <span className="badge bg-primary me-2">{bus.acType}</span>
              <span className="badge bg-secondary me-2">{bus.busType}</span>
              <span className="badge bg-info">₹{bus.price} per seat</span>
            </div>
          </div>
        </div>
      </div>

      {!showPassengerForm ? (
        <>
          {/* Seat Selection */}
          <div className="row">
            <div className="col-lg-8">
              <div className="seat-selection-container">
                <h5 className="mb-3">Select Your Seats</h5>

                {/* Seat Legend */}
                <div className="seat-legend mb-3">
                  <div className="legend-item">
                    <div className="seat-demo seat-available"></div>
                    <span>Available</span>
                  </div>
                  <div className="legend-item">
                    <div className="seat-demo seat-selected"></div>
                    <span>Selected</span>
                  </div>
                  <div className="legend-item">
                    <div className="seat-demo seat-booked"></div>
                    <span>Booked</span>
                  </div>
                  <div className="legend-item">
                    <div className="seat-demo seat-locked"></div>
                    <span>Locked</span>
                  </div>
                </div>

                {/* Seat Grid */}
                <div className="seat-grid">
                  {seats.map((seat) => (
                    <div
                      key={seat.id}
                      className={`seat ${getSeatStatusClass(seat)}`}
                      onClick={() => handleSeatClick(seat)}
                      title={`${seat.seatNumber} - ${getSeatStatusText(seat)}`}
                    >
                      {seat.seatNumber}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="col-lg-4">
              <div className="booking-summary">
                <h5>Booking Summary</h5>
                <div className="summary-item">
                  <span>Selected Seats:</span>
                  <span>{selectedSeats.length}</span>
                </div>
                <div className="summary-item">
                  <span>Price per Seat:</span>
                  <span>₹{bus.price}</span>
                </div>
                <div className="summary-item total">
                  <span>Total Amount:</span>
                  <span>₹{selectedSeats.length * bus.price}</span>
                </div>

                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={handleProceedToBooking}
                  disabled={selectedSeats.length === 0}
                >
                  Proceed to Booking ({selectedSeats.length} seats)
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Passenger Details Form */}
          <div className="row">
            <div className="col-12">
              <div className="passenger-form-container">
                <h5>Passenger Details</h5>
                <p className="text-muted">Please fill details for each selected seat</p>

                {passengerDetails.map((passenger, index) => (
                  <div key={index} className="passenger-form-card">
                    <h6>Passenger {index + 1} - Seat {passenger.seatNumber}</h6>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={passenger.name}
                          onChange={(e) => handlePassengerDetailChange(index, "name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label">Age *</label>
                        <input
                          type="number"
                          className="form-control"
                          value={passenger.age}
                          onChange={(e) => handlePassengerDetailChange(index, "age", e.target.value)}
                          min="1"
                          max="120"
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label">Gender *</label>
                        <select
                          className="form-select"
                          value={passenger.gender}
                          onChange={(e) => handlePassengerDetailChange(index, "gender", e.target.value)}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone Number *</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={passenger.phone}
                          onChange={(e) => handlePassengerDetailChange(index, "phone", e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={passenger.email}
                          onChange={(e) => handlePassengerDetailChange(index, "email", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassengerForm(false)}
                  >
                    ← Back to Seat Selection
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleBooking}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SeatSelection;

