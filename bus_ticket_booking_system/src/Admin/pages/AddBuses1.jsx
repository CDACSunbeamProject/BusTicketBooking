import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addNewBus } from "../services/BusService";
import dayjs from "dayjs";
import { useAuth } from "../../AuthContext";

function AddBuses1() {
  const [info, setInfo] = useState({
    busName: "",
    busNo: "",
    busType: "",
    operatorName: "",
    acType: "",
    seatType: "",
    fare: "",
    totalSeats: "",
    startLocation: "",
    endLocation: "",
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    duration: "",
    rating: "",
    amenities: [],
  });

  const amenitiesList = [
    "Water Bottle",
    "WiFi",
    "Charging Point",
    "Reading Light",
    "TV",
    "CCTV",
    "First Aid Box",
    "Emergency Exit",
  ];

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setInfo((prev) => ({
        ...prev,
        amenities: [...prev.amenities, value],
      }));
    } else {
      setInfo((prev) => ({
        ...prev,
        amenities: prev.amenities.filter((item) => item !== value),
      }));
    }
  };

  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();

    if (
      !info.busName ||
      !info.busNo ||
      !info.busType ||
      !info.operatorName ||
      !info.acType ||
      !info.seatType ||
      !info.fare ||
      !info.totalSeats ||
      !info.startLocation ||
      !info.endLocation ||
      !info.departureDate ||
      !info.departureTime ||
      !info.arrivalDate ||
      !info.arrivalTime ||
      !info.duration ||
      !info.rating
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formattedDepartureDate = dayjs(info.departureDate).format(
      "DD-MM-YYYY"
    );
    const formattedArrivalDate = dayjs(info.arrivalDate).format("DD-MM-YYYY");
    const formattedDepartureTime = info.departureTime + ":00";
    const formattedArrivalTime = info.arrivalTime + ":00";

    const newBus = {
      busName: info.busName,
      busNo: info.busNo,
      busType: info.busType,
      operatorName: info.operatorName,
      acType: info.acType,
      seatType: info.seatType,
      price: Number(info.fare),
      noOfSeats: Number(info.totalSeats),
      startLocation: info.startLocation,
      endLocation: info.endLocation,
      departureDate: formattedDepartureDate,
      departureTime: formattedDepartureTime,
      arrivalDate: formattedArrivalDate,
      arrivalTime: formattedArrivalTime,
      duration: Number(info.duration),
      rating: Number(info.rating),
      amenities: info.amenities,
    };

    addNewBus(newBus, token)
      .then(() => {
        toast.success("Bus added successfully!");
        navigate("/admin/buses");
      })
      .catch((error) => {
        console.error("Error adding bus:", error);
        toast.error("Failed to add bus.");
      });
  };

  const handleCancel = () => {
    navigate("../");
  };

  return (
    <div className="container py-4">
      <h2 className="page-header mb-4 text-primary fw-bold">Add New Bus</h2>
      <form onSubmit={handleSave}>
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Name</label>
            <input
              value={info.busName}
              onChange={(e) => setInfo({ ...info, busName: e.target.value })}
              type="text"
              placeholder="Enter bus name"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Number</label>
            <input
              value={info.busNo}
              onChange={(e) => setInfo({ ...info, busNo: e.target.value })}
              type="text"
              placeholder="Enter bus number"
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Type</label>
            <input
              value={info.busType}
              onChange={(e) => setInfo({ ...info, busType: e.target.value })}
              type="text"
              placeholder="Enter bus type (Volvo, Benz...)"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Operator Name</label>
            <input
              value={info.operatorName}
              placeholder="Enter operator name"
              onChange={(e) =>
                setInfo({ ...info, operatorName: e.target.value })
              }
              type="text"
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">AC Type</label>
            <select
              value={info.acType}
              onChange={(e) => setInfo({ ...info, acType: e.target.value })}
              className="form-select"
              required
            >
              <option value="">Select AC Type</option>
              <option value="AC">AC</option>
              <option value="NON-AC">NON-AC</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Seat Type</label>
            <select
              name="seatType"
              value={info.seatType}
              onChange={(e) => setInfo({ ...info, seatType: e.target.value })}
              className="form-select"
              required
            >
              <option value="">Select Seat Type</option>
              <option value="Sleeper">Sleeper</option>
              <option value="Seater">Seater</option>
            </select>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Fare</label>
            <input
              value={info.fare}
              placeholder="Enter seat price"
              onChange={(e) => setInfo({ ...info, fare: e.target.value })}
              type="number"
              className="form-control"
              min="0"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Total Seats</label>
            <input
              value={info.totalSeats}
              placeholder="Enter total seats"
              onChange={(e) => setInfo({ ...info, totalSeats: e.target.value })}
              type="number"
              className="form-control"
              min="1"
              required
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Start Location</label>
            <input
              value={info.startLocation}
              placeholder="Enter start location"
              onChange={(e) =>
                setInfo({ ...info, startLocation: e.target.value })
              }
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">End Location</label>
            <input
              value={info.endLocation}
              placeholder="Enter end location"
              onChange={(e) =>
                setInfo({ ...info, endLocation: e.target.value })
              }
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Departure Date</label>
            <input
              value={info.departureDate}
              onChange={(e) =>
                setInfo({ ...info, departureDate: e.target.value })
              }
              type="date"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Departure Time</label>
            <input
              value={info.departureTime?.slice(0, 5)}
              onChange={(e) =>
                setInfo({ ...info, departureTime: e.target.value })
              }
              type="time"
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Arrival Date</label>
            <input
              value={info.arrivalDate}
              onChange={(e) =>
                setInfo({ ...info, arrivalDate: e.target.value })
              }
              type="date"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Arrival Time</label>
            <input
              value={info.arrivalTime?.slice(0, 5)}
              onChange={(e) =>
                setInfo({ ...info, arrivalTime: e.target.value })
              }
              type="time"
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Duration (in hours)
            </label>
            <input
              value={info.duration}
              placeholder="Enter journey duration"
              onChange={(e) => setInfo({ ...info, duration: e.target.value })}
              type="number"
              className="form-control"
              min="0"
              step="0.1"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Rating (1 to 5)</label>
            <input
              value={info.rating}
              placeholder="Enter bus rating"
              onChange={(e) => setInfo({ ...info, rating: e.target.value })}
              type="number"
              className="form-control"
              min="1"
              max="5"
              step="0.1"
              required
            />
          </div>
        </div>

        <fieldset className="mb-4">
          <legend className="fw-semibold">Amenities</legend>
          <div className="row">
            {amenitiesList.map((amenity) => (
              <div key={amenity} className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={amenity}
                    value={amenity}
                    onChange={handleAmenityChange}
                    checked={info.amenities.includes(amenity)}
                  />
                  <label className="form-check-label" htmlFor={amenity}>
                    {amenity}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        <div className="d-flex gap-5">
          <button type="submit" className="btn btn-success col-1">
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-danger col-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBuses1;
