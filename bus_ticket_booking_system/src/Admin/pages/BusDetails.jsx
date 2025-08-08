import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBusDetailsById } from "../../User/services/busService";

function BusDetails() {
  const { busId } = useParams() || 0;
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const loadBusData = async () => {
      try {
        const data = await getBusDetailsById(busId);
        setBus(data);
      } catch (err) {
        setError("Failed to load bus details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBusData();
  }, [busId]);

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center my-5 py-4">
        <i className="bi bi-exclamation-triangle-fill fs-1 mb-3"></i>
        <h4>{error}</h4>
        <button
          className="btn btn-outline-danger mt-3"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );

  if (!bus)
    return (
      <div className="alert alert-info text-center my-5 py-4">
        <i className="bi bi-info-circle-fill fs-1 mb-3"></i>
        <h4>Bus not found</h4>
        <button
          className="btn btn-outline-primary mt-3"
          onClick={() => navigate("/buses")}
        >
          Browse Buses
        </button>
      </div>
    );
    const getSleeperSeats = () => {
      if (!bus) return null;

      const totalSeats = bus.noOfSeats;
      return (
        <div className="container">
          <div className="row p-4 justify-content-center align-items-center">
            <div className="col shadow-sm border border-1 border-dark pt-3 pb-3 me-4 bg-white rounded-5">
              <div className="pb-3 fs-5 fw-bold text-center">Lower Deck</div>
              {renderSeatsSection(1, Math.floor(totalSeats / 2))}
            </div>
            <div className="ms-4 pt-3 border border-1 border-dark shadow-sm pb-3 col bg-white rounded-5">
              <div className="pb-3 fs-5 fw-bold text-center">Upper Deck</div>
              {renderSeatsSection(Math.floor(totalSeats / 2) + 1, totalSeats)}
            </div>
          </div>
        </div>
      );
    };
      const getSeaterSeats = () => {
        if (!bus) return null;

        const seatsPerRow = 4;
        const rows = [];

        for (let i = 1; i <= bus.noOfSeats; i += seatsPerRow) {
          const rowSeats = [];

          // Left 2 seats
          for (let j = 0; j < 2; j++) {
            const seatNo = i + j;
            if (seatNo <= bus.noOfSeats) {
              rowSeats.push(getSeatBox(seatNo));
            }
          }

          // Walkway gap
          rowSeats.push(
            <div
              key={`gap-${i}`}
              className="m-1"
              style={{ width: "30px", height: "35px", visibility: "hidden" }}
            />
          );

          // Right 2 seats
          for (let j = 2; j < 4; j++) {
            const seatNo = i + j;
            if (seatNo <= bus.noOfSeats) {
              rowSeats.push(getSeatBox(seatNo));
            }
          }

          rows.push(
            <div key={`row-${i}`} className="d-flex justify-content-center">
              {rowSeats}
            </div>
          );
        }

        return <div className="border rounded-3 bg-white p-4">{rows}</div>;
      };
      const renderSeatsSection = (start, end) => {
        const seatsPerRow = 3;
        const rows = [];

        for (let i = start; i <= end; i += seatsPerRow) {
          const rowSeats = [];

          // Left seat
          for (let j = 0; j < 1; j++) {
            const seatNo = i + j;
            if (seatNo <= end) {
              rowSeats.push(getSeatBox(seatNo));
            }
          }

          // Walkway gap
          rowSeats.push(
            <div
              key={`gap-${i}`}
              className=""
              style={{ width: "30px", height: "35px", visibility: "hidden" }}
            />
          );

          // Right 2 seats
          for (let j = 1; j < 3; j++) {
            const seatNo = i + j;
            if (seatNo <= end) {
              rowSeats.push(getSeatBox(seatNo));
            }
          }

          rows.push(
            <div key={`row-${i}`} className="d-flex justify-content-center">
              {rowSeats}
            </div>
          );
        }

        return <div className="bg-white round-5">{rows}</div>;
      };
      
    const renderSeats = () => {
      if (!bus) return <div>Loading bus details...</div>;
      return bus.seatType === "Sleeper"
        ? getSleeperSeats()
        : getSeaterSeats();
    };
      const getSeatBox = (seatNo) => {
        if (!bus) return null;

        const isBooked =
          Array.isArray(bus.bookedSeats) && bus.bookedSeats.includes(seatNo);;

        const seatClass = [
          isBooked
            ? "bg-danger text-white"
            : "bg-light",
          bus.seatType === "Sleeper" ? "pt-4 pb-4" : "",
        ].join(" ");

        return (
          <div
            key={seatNo}
            className={`border rounded text-center p-2 m-2 seat-box ${seatClass}`}
            style={{
              width: "35px",
              // cursor: isBooked ? "not-allowed" : "",
            }}
            onClick={() => !isBooked && handleSeatClick(seatNo)}
          >
            {seatNo}
          </div>
        );
      };
const renderBodyData = () => {
  if (!bus) return <div>Loading bus layout...</div>;

  const seatsDesign = bus.seatType === "Sleeper" ? "col-6" : "col-3";
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div
          className={`${seatsDesign} justify-content-center align-items-center`}
        >
          {renderSeats()}
        </div>
        <div className="col-5 ms-0">
          <div className="container">
            <div className="row fs-4 bg-white align-items-center  border rounded p-5">
              <div className="col-12 text-start">
                <strong>Seat Type: {bus.seatType}</strong>
              </div>
              <div className="col-12 text-start">
                <strong>Total No of Seats: {bus.noOfSeats}</strong>
              </div>
              <div className="col-12 text-start">
                <strong className="text-danger">
                  Total Booked Seats:{" "}
                  {Array.isArray(bus.bookedSeats) ? bus.bookedSeats.length : 0}
                </strong>
              </div>
              <div className="col-12 text-start">
                <strong
                  className="text-success"
                >
                  Total Available Seats:{" "}
                  {bus.noOfSeats -
                    (Array.isArray(bus.bookedSeats)
                      ? bus.bookedSeats.length
                      : 0)}
                </strong>
              </div>
              <div className="row text-center mt-3">
                <div className="col border m-2 bg-danger rounded p-2">
                  <span>Booked</span>
                </div>
                <div className="col border m-2 bg-light rounded p-2">
                  <span>Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
  return (
    <div className="container m-4 p-5 my-4">
      {/* Hero Section */}
      <div className="card border-0 shadow-lg overflow-hidden mb-4">
        <div className="row g-0">
          <div className="col-md-4 bg-primary text-white p-4 d-flex flex-column justify-content-center">
            <h1 className="display-5 fw-bold">{bus.busName}</h1>
            <div className="d-flex align-items-center mb-3">
              <span className="badge bg-white text-primary fs-6 me-2">
                {bus.busNo}
              </span>
              <span className="badge bg-light text-dark fs-6">
                {bus.busType}
              </span>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-star-fill text-warning me-1"></i>
              <span className="me-3">{bus.rating}</span>
              <i className="bi bi-people-fill me-1"></i>
              <span>{bus.noOfSeats} Seats</span>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">
                  {bus.startLocation} <i className="bi bi-arrow-right mx-2"></i>{" "}
                  {bus.endLocation}
                </h2>
                <span className="badge bg-success fs-6">
                  <i className="bi bi-clock-history me-1"></i> {bus.duration}{" "}
                  hrs
                </span>
              </div>

              <div className="timeline-container mb-4">
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-content">
                      <h5 className="text-primary">Departure</h5>
                      <p className="mb-1 fw-bold">{bus.departureDate}</p>
                      <p className="text-muted">{bus.departureTime}</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-content">
                      <h5 className="text-primary">Arrival</h5>
                      <p className="mb-1 fw-bold">{bus.arrivalDate}</p>
                      <p className="text-muted">{bus.arrivalTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <h3 className="text-success mb-0">₹{bus.price}</h3>
                <button
                  className="btn btn-danger btn-lg px-4 py-2"
                  onClick={() =>
                    navigate("/User/seatselection", {
                      state: { busName: bus.busName },
                    })
                  }
                >
                  <i className="bi bi-ticket-perforated me-2"></i> Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <i className="bi bi-info-circle me-1"></i> Overview
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "amenities" ? "active" : ""}`}
            onClick={() => setActiveTab("amenities")}
          >
            <i className="bi bi-list-check me-1"></i> Amenities
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "seats" ? "active" : ""}`}
            onClick={() => setActiveTab("seats")}
          >
            <i className="bi bi-grid-3x3-gap me-1"></i> Seat Layout
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "policies" ? "active" : ""}`}
            onClick={() => setActiveTab("policies")}
          >
            <i className="bi bi-shield-check me-1"></i> Policies
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          {activeTab === "overview" && (
            <div className="row">
              <div className="col-md-6">
                <h4 className="mb-3 text-primary">
                  <i className="bi bi-building me-2"></i> Operator Details
                </h4>
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-light rounded-circle p-3 me-3">
                    <i className="bi bi-bus-front text-primary fs-3"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">{bus.operatorName}</h5>
                    <p className="text-muted mb-0">
                      {bus.acType} | {bus.seatType}
                    </p>
                  </div>
                </div>
                <p className="text-muted">
                  This {bus.busType} bus offers comfortable travel with{" "}
                  {bus.noOfSeats} seats. Enjoy your journey from{" "}
                  {bus.startLocation} to {bus.endLocation} in approximately{" "}
                  {bus.duration} hours.
                </p>
              </div>
              <div className="col-md-6">
                <h4 className="mb-3 text-primary">
                  <i className="bi bi-clock-history me-2"></i> Schedule
                </h4>
                <div className="schedule-card bg-light p-3 rounded">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold">Departure:</span>
                    <span>
                      {bus.departureDate} at {bus.arrivalTime}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">Arrival:</span>
                    <span>
                      {bus.arrivalDate} at {bus.arrivalTime}
                    </span>
                  </div>
                  <div className="progress mt-3" style={{ height: "6px" }}>
                    <div
                      className="progress-bar bg-primary"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "amenities" && (
            <div>
              <h4 className="mb-3 text-primary">
                <i className="bi bi-list-check me-2"></i> Available Amenities
              </h4>
              <div className="row">
                {bus.amenities.map((amenity, index) => (
                  <div key={index} className="col-md-4 mb-3">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <div className="bg-primary text-white rounded-circle p-2 me-3">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span className="fw-medium">{amenity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "policies" && (
            <div>
              <h4 className="mb-3 text-primary">
                <i className="bi bi-shield-check me-2"></i> Travel Policies
              </h4>
              <div className="alert alert-info">
                <h5>
                  <i className="bi bi-info-circle-fill me-2"></i> Cancellation
                  Policy
                </h5>
                <ul>
                  <li>
                    Cancel up to 24 hours before departure for full refund
                  </li>
                  <li>
                    50% refund if cancelled between 12-24 hours before departure
                  </li>
                  <li>
                    No refund for cancellations within 12 hours of departure
                  </li>
                </ul>
              </div>
              <div className="alert alert-warning">
                <h5>
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>{" "}
                  Luggage Policy
                </h5>
                <ul>
                  <li>1 hand baggage (up to 7kg) allowed free</li>
                  <li>1 check-in baggage (up to 15kg) allowed free</li>
                  <li>Extra luggage charges may apply</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "seats" && (
            <div className="row justify-content-center align-items-center rounded">
              {renderBodyData()}
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mb-5">
        <button
          className="btn btn-primary btn-lg px-5 py-3"
          onClick={() =>
            navigate("/User/seatselection", { state: { busName: bus.busName } })
          }
        >
          <i className="bi bi-ticket-perforated me-2"></i> Book Your Seats Now
        </button>
      </div>
    </div>
  );
}

// Helper function to get icons for amenities
// Helper function to get icons for amenities
function getAmenityIcon(amenity) {
  const iconMap = {
    "Water Bottle": "cup",
    WiFi: "wifi",
    "Charging Point": "lightning-charge",
    "Reading Light": "lamp",
    TV: "tv",
    CCTV: "camera-video",
    "First Aid Box": "first-aid",
    "Emergency Exit": "door-open",
  };

  const defaultIcon = "check-circle";
  const iconName = iconMap[amenity] || defaultIcon;

  return <i className={`bi bi-${iconName}`}></i>;
}

export default BusDetails;
