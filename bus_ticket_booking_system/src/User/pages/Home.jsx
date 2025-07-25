import React from 'react';
import { FaBus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const BusBookingHome = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <FaBus size={70} className="text-dark mb-4" />
        <h1 className="fw-bold mb-3">
          Bus Ticket<br />Booking System
        </h1>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary d-flex align-items-center px-4 py-2 fs-5">
            <FaBus className="me-2" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusBookingHome;
