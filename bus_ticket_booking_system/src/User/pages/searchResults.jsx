import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function SearchResults() {
  
  const [buses, setBuses] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve routeId and jDate from location or localStorage
  const routeId = location?.state?.routeId || localStorage.getItem("routeId");
  const jDate = location?.state?.jDate || localStorage.getItem("searchDate");

  useEffect(() => {
  console.log("Inside useEffect");
  console.log("routeId:", routeId);
  console.log("jDate:", jDate);

  if (routeId && jDate) {
    axios.get(`http://localhost:9090/buses/${routeId}?jDate=${jDate}`)
      .then(response => {
        console.log("Fetched buses:", response.data); // 🔴 THIS MUST SHOW
        setBuses(response.data);
        localStorage.setItem("searchResults", JSON.stringify(response.data));
      })
      .catch(error => {
        console.error("Error fetching buses:", error); // 🔴 If this shows, the API call failed
      });
  } else {
    console.warn("Missing routeId or jDate, skipping fetch.");
  }
}, [routeId, jDate]);
 // Add routeId and jDate as dependencies

  return (
    <div className="container my-4">
      <h2>Search Results</h2>

      {buses.length === 0 ? (
        <p>No buses available.</p>
      ) : (
        buses.map((bus, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5>{bus.operatorName}</h5>
                <p>{bus.busType}</p>
                <p>⭐ {bus.rating}</p>
              </div>
              <div>
                <p>No. of Seats: {bus.noOfSeats}</p>
              </div>
              <div>
                <p><strong>{bus.departureTime}</strong> → <strong>{bus.arrivalTime}</strong></p>
              </div>
              <div className="text-end">
                <h5>₹{bus.price}</h5>
                
                  <button 
                  onClick={() => navigate('/user/seatselection', {state: { busId: bus.id }})}
                  className="btn btn-primary">Select Seats
                  </button>
              
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default SearchResults;
