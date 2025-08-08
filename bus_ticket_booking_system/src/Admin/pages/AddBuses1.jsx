import React, { useState, useContext } from "react";
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
    rating:"",
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
      rating:Number(info.rating),
      amenities: info.amenities,
    };
    console.log("Token being sent:", token);
    console.log(newBus);
    addNewBus(newBus, token)
      .then((response) => {
        toast.success("Bus added successfully!");
        navigate("/buses");
      })
      .catch((error) => {
        // if (err.response && err.response.data) 
        //   toast.error(err.response.data); // This will be "duplicate bus name!!"
        console.error("Error adding bus:", error);
        toast.error("Failed to add bus.");
      });
      
  };
  const handleCancel=()=>{
    navigate("../dashboard")
  };

  return (
    <div className="container">
      <h2 className="page-header">Add Bus</h2>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="">Name</label>
          <input
            value={info.busName}
            onChange={(e) => setInfo({ ...info, busName: e.target.value })}
            type="text"
            placeholder="Enter bus name"
            className="form-control"
          />
        </div>
        <div className="col">
          <label htmlFor="">Number</label>
          <input
            value={info.busNo}
            onChange={(e) => setInfo({ ...info, busNo: e.target.value })}
            type="text"
            placeholder="Enter bus number"
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="">Type</label>
          <input
            value={info.busType}
            onChange={(e) => setInfo({ ...info, busType: e.target.value })}
            type="text"
            placeholder="Enter bus type(Volvo,Benz...)"
            className="form-control"
          />
        </div>
        <div className="col">
          <label htmlFor="">Operator Name</label>
          <input
            value={info.operatorName}
            placeholder="Enter operator name"
            onChange={(e) => setInfo({ ...info, operatorName: e.target.value })}
            type="text"
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="">AC Type</label>
          <select
            value={info.acType}
            onChange={(e) => setInfo({ ...info, acType: e.target.value })}
            className="form-select"
          >
            <option value=""> Select AC Type </option>
            <option value="AC">AC</option>
            <option value="NON-AC">NON-AC</option>
          </select>
        </div>
        <div className="col">
          <label htmlFor="">Seat Type</label>
          <select
            name="seatType"
            value={info.seatType}
            onChange={(e) => setInfo({ ...info, seatType: e.target.value })}
            className="form-select"
          >
            <option value="">Select Seat Type</option>
            <option value="Sleeper">Sleeper</option>
            <option value="seater">Seater</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="">Fare</label>
          <input
            value={info.fare}
            placeholder="Enter seat price"
            onChange={(e) => setInfo({ ...info, fare: e.target.value })}
            type="number"
            className="form-control"
          />
        </div>
        <div className="col">
          <label htmlFor="">Total Seats</label>
          <input
            value={info.totalSeats}
            placeholder="Enter total seats"
            onChange={(e) => setInfo({ ...info, totalSeats: e.target.value })}
            type="number"
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="">Start Location</label>
          <input
            value={info.startLocation}
            placeholder="Enter start location"
            onChange={(e) =>
              setInfo({ ...info, startLocation: e.target.value })
            }
            className="form-control"
          />
        </div>
        <div className="col">
          <label htmlFor="">End Location</label>
          <input
            value={info.endLocation}
            placeholder="Enter end location"
            onChange={(e) => setInfo({ ...info, endLocation: e.target.value })}
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="">Departure Date and Time</label>
          <input
            value={info.departureDate}
            onChange={(e) =>
              setInfo({ ...info, departureDate: e.target.value })
            }
            type="date"
            className="form-control"
          />
          <input
            value={info.departureTime?.slice(0, 5)}
            onChange={(e) =>
              setInfo({ ...info, departureTime: e.target.value })
            }
            type="time"
            className="form-control"
          />
        </div>
        <div className="col">
          <label htmlFor="">Arrival Date and Time</label>
          <input
            value={info.arrivalDate}
            onChange={(e) => setInfo({ ...info, arrivalDate: e.target.value })}
            type="date"
            className="form-control"
          />
          <input
            value={info.arrivalTime?.slice(0, 5)}
            onChange={(e) => setInfo({ ...info, arrivalTime: e.target.value })}
            type="time"
            className="form-control"
          />
        </div>
      </div>

      {/*<div className='row mb-3'>
        <div className='col'>
          <label htmlFor=''>Bus Details</label>
          <textarea
            onChange={(e) => setInfo({ ...info, details: e.target.value })}
            rows={5}
            className='form-control'
          />
        </div>
      </div>*/}

      {/*<div className='row mb-3'>
                <label htmlFor=''>Route:</label>
                <select
                    //value={selectedRouteId}
                    //onChange={(e) => setSelectedRouteId(e.target.value)}
                    required
                >
                    <option value="">-- Select Route --</option>
                    <option value="">Kolhapur to Pune</option>
                    <option value="">Pune to Mumbai</option>
                    {/*routes.map((route) => (
                    <option key={route.id} value={route.id}>
                        {route.source} → {route.destination}
                    </option>
                ))}
                </select>
                
            </div>*/}

      {/*<div className='row mb-3'>
                <div className='col'>
                    <label htmlFor=''>#Guests</label>
                    <input
                        onChange={(e) => setInfo({ ...info, guests: e.target.value })}
                        type='number'
                        className='form-control'
                    />
                </div>
                <div className='col'>
                    <label htmlFor=''>#Bedrooms</label>
                    <input
                        onChange={(e) => setInfo({ ...info, bedrooms: e.target.value })}
                        type='number'
                        className='form-control'
                    />
                </div>
                <div className='col'>
                    <label htmlFor=''>#Beds</label>
                    <input
                        onChange={(e) => setInfo({ ...info, beds: e.target.value })}
                        type='number'
                        className='form-control'
                    />
                </div>
            </div>*/}
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="">Duration</label>
          <input
            value={info.duration}
            placeholder="Enter journey duration"
            onChange={(e) => setInfo({ ...info, duration: e.target.value })}
            type="number"
            className="form-control"
          />
        </div>
        <div className="col">
          <label htmlFor="">Rating</label>
          <input
            value={info.rating}
            placeholder="Enter bus rating"
            onChange={(e) => setInfo({ ...info, rating: e.target.value })}
            type="number"
            className="form-control"
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label>Amenities:</label>
        {amenitiesList.map((amenity) => (
          <div key={amenity}>
            <input
              type="checkbox"
              value={amenity}
              onChange={handleAmenityChange}
              checked={info.amenities.includes(amenity)}
            />
            <span> {amenity}</span>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col">
          <button onClick={handleSave} className="btn btn-success">
            Save
          </button>
          <button
            onClick={handleCancel}
            className="btn btn-danger ms-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBuses1;
/**
 *

 */
