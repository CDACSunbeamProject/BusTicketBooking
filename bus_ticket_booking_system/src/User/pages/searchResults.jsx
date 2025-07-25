import React from 'react';
import SeatSelection from './SeatSelection';
import { Link } from "react-router-dom";

function SearchResults() {
  // Example static data — replace with fetched data later
  const buses = [
    {
      id: 1,
      operator: 'Nakoda Travels',
      type: 'Volvo A/C (2+2)',
      startloc:'pune',
      endloc:'kolhapur',
      traveldate:'25-07-2025',
      rating: 3.8,
      reviews: 211,
      departure: '15:35',
      arrival: '21:20',
      duration: '5h 45m',
      seats: 24,
      price: 476
    },
    // Add more buses here
  ];

  return (
    <div className="container my-4">
      <h2>Search Results</h2>

      {buses.map(bus => (
        <div key={bus.id} className="card mb-3">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5>{bus.operator}</h5>
              <p>{bus.type}</p>
              <p>
                ⭐ {bus.rating} ({bus.reviews} reviews)
              </p>
            </div>
            <div>
              <p><strong>{bus.startloc}</strong> → <strong>{bus.endloc}</strong></p>
              <p>{bus.duration} • {bus.seats} Seats</p>
            </div>
            <div>
              <p><strong>{bus.departure}</strong> → <strong>{bus.arrival}</strong></p>
              <p>{bus.traveldate}</p>
            </div>
            <div className="text-end">
              <h5>₹{bus.price}</h5>
              <Link to="/user/seatselection">
                <button className="btn btn-primary">Select Seats</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
