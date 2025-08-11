import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // ✅ Make sure path is correct
import { FaBus, FaUser } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout(); // ✅ Clears token & state
    navigate("/"); // ✅ Redirect to login
  };

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleSignIn = () => {
    navigate("/login");
  };
  const handleHome = () => {
    navigate("/");
  };
  const handleMyBookings = () => {
    navigate("/mybookings");
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleAbout = () =>{
    navigate("/about")
  }
  const handleRoutes = () => {
    navigate("/routes");
  };
  
  const handleContactUs = () => {
    navigate("/contact");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark header-color no-print px-4">
      <div className="px-5 py-1">
        <Link
          className="d-flex align-items-center text-white fs-4 fw-bold text-decoration-none"
          to="/"
        >
          {/* <img src="/../images/logo.png" alt="Route 360" /> */}
          <FaBus className="text-warning p-1 fs-1 me-1" />
          <span>Route 360</span>
        </Link>
      </div>
      {/* <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button> */}

      <div
        className="collapse navbar-collapse justify-content-end fw-bold"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item me-3">
            <button
              className="nav-link d-grid gap-1"
              onClick={handleHome}
              style={{ width: "120px" }}
            >
              <span className="btn border-3 w-100 btn-outline-info text-white">
                Home
              </span>
            </button>
          </li>
          <li className="nav-item me-3">
            <button
              className="nav-link d-grid gap-1"
              onClick={handleRoutes}
              style={{ width: "120px" }}
            >
              <span className="btn border-3 w-100 btn-outline-info text-white">
                Routes
              </span>
            </button>
          </li>
          <li className="nav-item me-3">
            <button
              className="nav-link d-grid gap-1"
              onClick={handleAbout}
              style={{ width: "120px" }}
            >
              <span className="btn border-3 w-100 btn-outline-info text-white">
                About Us
              </span>
            </button>
          </li>
          <li className="nav-item me-3">
            <button
              className="nav-link d-grid gap-1"
              onClick={handleContactUs}
              style={{ width: "120px" }}
            >
              <span className="btn border-3 w-100 btn-outline-info text-white">
                Contact
              </span>
            </button>
          </li>
          {/* ✅ Show nav links only if logged in */}
          {isLoggedIn && (
            <>
              {/* <li className="nav-item me-3">
                <Link className="nav-link text-white" to="/viewticket">View Ticket</Link>
              </li>
              <li className="nav-item me-3">
                <Link className="nav-link text-white" to="/cancelticket">Cancel Ticket</Link>
              </li> 
              <li className="nav-item me-3">
                <Link className="nav-link text-white" to="/viewbuses">View Buses</Link>
              </li> */}
              <li className="nav-item me-3">
                <button
                  className="nav-link d-grid gap-1"
                  onClick={handleMyBookings}
                  style={{ width: "140px" }}
                >
                  <span className="btn border-3 btn-outline-info text-white">
                    My Bookings
                  </span>
                </button>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="nav-item me-3">
                <button
                  className="nav-link d-grid gap-1"
                  onClick={handleProfile}
                  style={{ width: "120px" }}
                >
                  <span className="btn border-3 w-100 btn-outline-info text-white">
                    <FaUser className="me me-2 mb-1" />
                    Profile
                  </span>
                </button>
              </li>
            </>
          )}

          {/* ✅ Conditionally show Login / Logout */}
          {!isLoggedIn ? (
            <>
              <li className="nav-item me-3">
                <button
                  className="nav-link d-grid gap-1"
                  onClick={handleSignUp}
                  style={{ width: "120px" }}
                >
                  <span className="btn border-3 btn-primary text-white">
                    Sign Up
                  </span>
                </button>
              </li>
              <li className="nav-item me-3">
                <button
                  className="nav-link d-grid gap-1"
                  onClick={handleSignIn}
                  style={{ width: "120px" }}
                >
                  <span className="btn border-3 btn-primary text-white">
                    Sign In
                  </span>
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item me-3">
              <button
                className="nav-link d-grid gap-1"
                onClick={handleLogout}
                style={{ width: "120px" }}
              >
                <span className="btn border-3 btn-danger text-white">
                  Log out
                </span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
