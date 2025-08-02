import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengersContactDetails, setPassengersContactDetails] = useState({
    mobile: "",
    email: "",
  });
  const [passengerDetails, setPassengerDetails] = useState([]);
  useEffect(() => {
    // When seats are selected, create empty records
    const initialData = selectedSeats.map((seatNo) => ({
      seatNo:'',
      name: "",
      gender: "",
      age: "",
    }));
    setPassengerDetails(initialData);
  }, [selectedSeats]);
  const handleInputChange = (index, field, value) => {
    const updatedDetails = [...passengerDetails];
    updatedDetails[index][field] = value;
    setPassengerDetails(updatedDetails);
  };
  const bookedSeats = [2, 5, 12, 21, 23]; // Already booked
  const fare = 600;
  const totalFare = selectedSeats.length * fare;
  const navigate = useNavigate();

  const busDetails = {
    sleeper: false, // Change to "true" to test other layout
    src: "Pune",
    dest: "Bangalore",
    totalSeats: 36,
  };

  const handleSeatClick = (seatNo) => {
    if (bookedSeats.includes(seatNo)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatNo)
        ? prev.filter((s) => s !== seatNo)
        : [...prev, seatNo]
    );
  };

  const getSeatBox = (seatNo) => {
    const isBooked = bookedSeats.includes(seatNo);
    const isSelected = selectedSeats.includes(seatNo);
    let seatClass = isBooked
      ? "bg-danger text-white"
      : isSelected
      ? "bg-success text-white"
      : "bg-light";

    seatClass += busDetails.sleeper ? " pt-4 pb-4" : "";

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
    const seatsPerRow = 4;
    const rows = [];
    for (let i = 1; i <= busDetails.totalSeats; i += seatsPerRow) {
      const rowSeats = [];
      // Left 2 seats
      for (let j = 0; j < 2; j++) {
        const seatNo = i + j;
        if (seatNo <= busDetails.totalSeats) {
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
        if (seatNo <= busDetails.totalSeats) {
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
  const getAllSeats = (k, n) => {
    const seatsPerRow = 3;
    const rows = [];
    for (let i = k; i <= n; i += seatsPerRow) {
      const rowSeats = [];
      // Left 2 seats
      for (let j = 0; j < 1; j++) {
        const seatNo = i + j;
        if (seatNo <= n) {
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
        if (seatNo <= n) {
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

  const getSleeperSeats = () => {
    const totalSeats = busDetails.totalSeats;
    return (
      <div className="conatiner">
        <div className="row p-4 justify-content-center align-items-center">
          <div className="col shadow-sm border border-1 border-dark pt-3 pb-3 me-4 bg-white rounded-5">
            <div className="pb-3 fs-5 fw-bold">Lower Deck</div>
            {getAllSeats(1, totalSeats / 2)}
          </div>
          <div className="ms-4 pt-3 border border-1 border-dark shadow-sm pb-3 col bg-white rounded-5">
            <div className="pb-3 fs-5 fw-bold">Upper Deck</div>
            {getAllSeats(totalSeats / 2 + 1, totalSeats)}
          </div>
        </div>
      </div>
    );
  };

  const renderSeats = () => {
    return busDetails.sleeper ? getSleeperSeats() : getSeaterSeats();
  };

  const passangersData = () => {
    return passengerDetails.map((passenger, index) => (
      <tr key={passenger.seatNo}>
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
            <option value="male">Male</option>
            <option value="female">Female</option>
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

  const handleContinue = (e) => {
    e.preventDefault();
    // You can uncomment and implement validation logic here
    console.log("Selected Seats:", selectedSeats);
    console.log("Contact Details:", passengersContactDetails);
    console.log("Passenger Details:", passengerDetails);
    navigate("/user/payment");
  };
  const handleCancel = () => {
    navigate("/user");
  };
  const bodyData = () => {
    const seatsDesign = busDetails.sleeper ? "col-6" : "col-3";
    return (
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div
            className={`${seatsDesign} justify-content-center align-items-center`}
          >
            {renderSeats()}
          </div>
          <div className={`col-4`}>
            <div className="container">
              <div className="row bg-white border rounded ps-3 pb-3 pt-3 m-2 mb-5">
                <div className="col-12 text-start">
                  <strong>Seat Status</strong>
                </div>
                <div className="row text-center">
                  <div className="col border m-2  bg-danger rounded p-2">
                    <span>Booked</span>
                  </div>
                  <div className="col border m-2 bg-light rounded p-2">
                    <span>Available</span>
                  </div>
                  <div className="col border m-2  bg-success rounded p-2">
                    <span>Selected</span>
                  </div>
                </div>
              </div>
              <div className="row m-2 offset-1 mt-5">
                <div className="bg-white border rounded p-3">
                  <div>
                    <strong>Selected Seats:</strong>{" "}
                    {selectedSeats.join(", ") || "None"}
                  </div>
                  <div>
                    <strong>Total Fare:</strong> ₹{totalFare}
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
    <div className="container bg-light border rounded-4 mt-5 mb-5 pb-4 shadow text-center ">
      <div className="row header-color rounded-top-4 justify-content-center mb-4">
        <div className="fs-3 m-2 fw-bold text-white">Book Your Seats</div>
      </div>

      {/* Bus seats Arrangement */}
      <div className="row justify-content-center align-items-center rounded">
        {bodyData()}
      </div>

      {/* Passenger Details */}
      <div className="row mt-5 text-start pb-3">
        <div className="col-md-4 offset-md-1">
          <div className="fs-3 fw-semibold mb-3">Passenger Details</div>
          <div className="input-group-md mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile No.
            </label>
            <input
              type="tel"
              className="form-control"
              id="mobile"
              required
              value={passengersContactDetails.mobile}
              onChange={(e) =>
                setPassengersContactDetails({
                  ...passengersContactDetails,
                  mobile: e.target.value,
                })
              }
            />
          </div>
          <div className="input-group-md mb-3">
            <label htmlFor="email" className="form-label">
              Email ID
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              value={passengersContactDetails.email}
              onChange={(e) =>
                setPassengersContactDetails({
                  ...passengersContactDetails,
                  email: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Passenger Info Table */}
      <div className="row justify-content-center align-items-center mb-4 mt-4">
        <div className="col-10">
          <table className="table table-bordered">
            <thead className="">
              <tr className="table-secondary">
                <th className="col-2">Seat No.</th>
                <th className="col-4">Name</th>
                <th className="col-2">Gender</th>
                <th className="col-2">Age</th>
              </tr>
            </thead>
            <tbody>{passangersData()}</tbody>
          </table>
        </div>
      </div>

      {/* Buttons */}
      <div className="row justify-content-center align-items-center mt-4 mb-4">
        <div className="col-5">
          <button className="col-4 btn btn-danger" onClick={handleCancel}>
            Cancel
          </button>
        </div>
        <div className="col-5">
          <button className="col-4 btn btn-success" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeatSelection;
