import React, { use } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () =>{
    alert("Logout successful!");
    navigate("/")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold" to="/">
        BusBooking
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/user">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/user/viewticket">
              View Ticket
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/user/cancelticket">
              Cancel Ticket
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/user/mybookings">
              My Bookings
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/user/viewbuses">
              View Buses
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/user/profile">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-danger ms-2" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
