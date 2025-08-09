import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";

function SeatSelection() {
  const userId=localStorage.getItem("id")
  const location = useLocation();
  const navigate = useNavigate();
  const { busId } = location.state || "";

  const [busDetails, setBusDetails] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [error, setError] = useState("");
  // busDetails.seatType="Sleeper";
  useEffect(() => {
    if (!busId) {
      setError("No bus selected");
      return;
    }

    const loadBusDetails = async () => {
      try {
        const response = await axiosInstance.get(`/buses/getbus/${busId}`);
        console.log(response.data);
        setBusDetails(response.data);
      } catch (err) {
        setError("Failed to load bus details");
        console.error("Error loading bus details:", err);
      }
    };

    loadBusDetails();
  }, [busId]);

  useEffect(() => {
    if (selectedSeats.length > 0) {
      const details = selectedSeats.map((seatNo) => ({
        seatNo,
        name: "",
        gender: "",
        age: "",
      }));
      setPassengerDetails(details);
    } else {
      setPassengerDetails([]);
    }
  }, [selectedSeats]);

  const handleInputChange = (index, field, value) => {
    const updatedDetails = [...passengerDetails];
    updatedDetails[index][field] = value;
    setPassengerDetails(updatedDetails);
  };

  const handleSeatClick = (seatNo) => {
    if (!busDetails?.bookedSeats) return;

    if (busDetails.bookedSeats.includes(seatNo)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatNo)
        ? prev.filter((s) => s !== seatNo)
        : [...prev, seatNo]
    );
  };

  const getSeatBox = (seatNo) => {
    if (!busDetails) return null;

    const isBooked = busDetails.bookedSeats.includes(seatNo);
    const isSelected = selectedSeats.includes(seatNo);

    const seatClass = [
      isBooked
        ? "bg-danger text-white"
        : isSelected
        ? "bg-success text-white"
        : "bg-light",
      busDetails.seatType === "Sleeper" ? "pt-4 pb-4" : "",
    ].join(" ");

    return (
      <div
        key={seatNo}
        className={`border rounded text-center p-2 m-2 seat-box ${seatClass}`}
        style={{
          width: "35px",
          cursor: isBooked ? "not-allowed" : "pointer",
        }}
        onClick={() => !isBooked && handleSeatClick(seatNo)}
      >
        {seatNo}
      </div>
    );
  };

  const getSeaterSeats = () => {
    if (!busDetails) return null;

    const seatsPerRow = 4;
    const rows = [];

    for (let i = 1; i <= busDetails.noOfSeats; i += seatsPerRow) {
      const rowSeats = [];

      // Left 2 seats
      for (let j = 0; j < 2; j++) {
        const seatNo = i + j;
        if (seatNo <= busDetails.noOfSeats) {
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
        if (seatNo <= busDetails.noOfSeats) {
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

  const getSleeperSeats = () => {
    if (!busDetails) return null;

    const totalSeats = busDetails.noOfSeats;
    return (
      <div className="container">
        <div className="row p-4 justify-content-center align-items-center">
          <div className="col shadow-sm border border-1 border-dark pt-3 pb-3 me-4 bg-white rounded-5">
            <div className="pb-3 fs-5 fw-bold">Lower Deck</div>
            {renderSeatsSection(1, Math.floor(totalSeats / 2))}
          </div>
          <div className="ms-4 pt-3 border border-1 border-dark shadow-sm pb-3 col bg-white rounded-5">
            <div className="pb-3 fs-5 fw-bold">Upper Deck</div>
            {renderSeatsSection(Math.floor(totalSeats / 2) + 1, totalSeats)}
          </div>
        </div>
      </div>
    );
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
    if (!busDetails) return <div>Loading bus details...</div>;
    return busDetails.seatType === "Sleeper"
      ? getSleeperSeats()
      : getSeaterSeats();
  };

  const renderPassengerData = () => {
    return passengerDetails.map((passenger, index) => (
      <tr key={`${passenger.seatNo}-${index}`}>
        <td>{passenger.seatNo}</td>
        <td className="input-group-sm">
          <input
            type="text"
            className="form-control"
            value={passenger.name}
            onChange={(e) => handleInputChange(index, "name", e.target.value)}
            required
          />
        </td>
        <td className="input-group-sm">
          <select
            className="form-select form-select-sm text-center"
            value={passenger.gender}
            onChange={(e) => handleInputChange(index, "gender", e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </td>
        <td className="input-group-sm">
          <input
            type="number"
            className="form-control"
            value={passenger.age}
            onChange={(e) => handleInputChange(index, "age", e.target.value)}
            required
          />
        </td>
      </tr>
    ));
  };

  const handleContinue = async (e) => {
    e.preventDefault();

    if (selectedSeats.length === 0) {
      setError("Please select at least one seat");
      return;
    }

    const isFormValid = passengerDetails.every(
      (passenger) => passenger.name && passenger.gender && passenger.age
    );

    if (!isFormValid) {
      toast.error("Please fill all passenger details");
      return;
    }
    try {
      // Step 1: Lock seats on backend
      await axiosInstance.post(
        `/lock-multiple/user/${userId}`,
        selectedSeats.map((seat) => seat.id) // send array only, not wrapped in object
      );

      // Step 2: Save booking data to localStorage (or state management)
      const bookingData = {
        busId: parseInt(busId),
        bus: busDetails,
        selectedSeats: selectedSeats,
        passengerDetails: passengerDetails,
        totalAmount: selectedSeats.length * busDetails.price,
      };
      localStorage.setItem("pendingBooking", JSON.stringify(bookingData));

      // Navigate to payment page
      navigate(`/user/payment`, { state: bookingData });
    } catch (error) {
      console.error("Error locking seats creating booking:", error);
      toast.error("Failed to lock seats booking. Try again");
    }
  };
  const renderBusInfo = () => {
    if (!busDetails) return null;

    return (
      <div className="row justify-content-center mb-4">
        <div className="col-10 bg-white p-3 rounded-3 shadow-sm">
          <div className="row pt-1">
            <div className="col-md-4">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-bus-front fs-1 me-4 ms-5 text-primary"></i>
                <div>
                  <h6 className="mb-0">{busDetails.busName}</h6>
                  <div className="text-muted">
                    {busDetails.busType} <br />
                    <pre>
                      {busDetails.acType} | {busDetails.seatType}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">{busDetails.startLocation}</span>
                  <span className="fw-bold">{busDetails.endLocation}</span>
                </div>
                <div className="progress" style={{ height: "3px" }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <div className="d-flex justify-content-between small text-muted">
                  <span>{busDetails.departureDate}</span>
                  <span>{busDetails.arrivalDate}</span>
                </div>
                <div className="d-flex justify-content-between small text-muted">
                  <span>{busDetails.departureTime}</span>
                  <span>{busDetails.arrivalTime}</span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-end">
                  <div className="fw-bold">₹{busDetails.price}</div>
                  <div className="small text-muted">
                    <i className="bi bi-star-fill text-warning"></i>{" "}
                    {busDetails.rating}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderBodyData = () => {
    if (!busDetails) return <div>Loading bus layout...</div>;

    const seatsDesign = busDetails.seatType === "Sleeper" ? "col-6" : "col-3";
    return (
      <div className="container">
        {renderBusInfo()}
        <div className="row justify-content-center align-items-center">
          <div
            className={`${seatsDesign} justify-content-center align-items-center`}
          >
            {renderSeats()}
          </div>
          <div className="col-5 ms-5">
            <div className="container">
              <div className="row bg-white border rounded p-4">
                <div className="col-12 text-start">
                  <strong>Seat Status</strong>
                </div>
                <div className="row text-center">
                  <div className="col border m-2 bg-danger rounded p-2">
                    <span>Booked</span>
                  </div>
                  <div className="col border m-2 bg-light rounded p-2">
                    <span>Available</span>
                  </div>
                  <div className="col border m-2 bg-success rounded p-2">
                    <span>Selected</span>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-5">
                <div className="bg-white border rounded pt-3 pb-3">
                  <div>
                    <strong>Selected Seats:</strong>{" "}
                    {selectedSeats.join(", ") || "None"}
                  </div>
                  <div>
                    <strong>Total Fare:</strong> ₹
                    {selectedSeats.length * (busDetails.price || 0)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">{error}</div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/user/searchresults")}
        >
          Back to Buses
        </button>
      </div>
    );
  }

  return (
    <div className="container bg-light border rounded-4 mt-5 mb-5 pb-4 shadow text-center">
      <div className="row header-color rounded-top-4 justify-content-center mb-4">
        <div className="fs-3 m-2 fw-bold text-white">
          {busDetails
            ? `Book Your Seats - ${busDetails.busName}`
            : "Loading..."}
        </div>
      </div>

      <div className="row justify-content-center align-items-center rounded">
        {renderBodyData()}
      </div>

      {selectedSeats.length > 0 && (
        <>
          <div className="row justify-content-center align-items-center mb-4 mt-4">
            <div className="col-10">
              <table className="table table-bordered">
                <thead>
                  <tr className="table-secondary">
                    <th className="col-2">Seat No.</th>
                    <th className="col-4">Name</th>
                    <th className="col-2">Gender</th>
                    <th className="col-2">Age</th>
                  </tr>
                </thead>
                <tbody>{renderPassengerData()}</tbody>
              </table>
            </div>
          </div>

          <div className="row justify-content-center align-items-center mt-4 mb-4">
            <div className="col-5">
              <button
                className="col-4 btn btn-danger"
                onClick={() => navigate("/user/searchresults")}
              >
                Cancel
              </button>
            </div>
            <div className="col-5">
              <button
                className="col-4 btn btn-success"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SeatSelection;
