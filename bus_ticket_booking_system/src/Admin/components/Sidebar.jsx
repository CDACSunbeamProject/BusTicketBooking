import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
  FaBus,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Account Logout Successful");
    navigate("/login");
  };

  return (
    <>
      {/* Fixed Top Navbar */}
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Admin Panel</span>
        </div>
      </nav>

      {/* Fixed Sidebar */}
      <div
        className="d-flex flex-column bg-dark text-white position-fixed vh-100"
        style={{
          width: "220px",
          top: "56px" /* navbar height */,
          overflowY:
            "auto" /* Enable scrolling only if content exceeds height */,
        }}
      >
        <ul className="nav flex-column p-3">
          <li className="nav-item mb-2">
            <Link
              className="nav-link text-white d-flex align-items-center"
              to="/admin"
            >
              <FaTachometerAlt className="me-2" />
              Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              className="nav-link text-white d-flex align-items-center"
              to="/admin/users"
            >
              <FaUsers className="me-2" />
              Users
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              className="nav-link text-white d-flex align-items-center"
              to="/admin/bookings"
            >
              <FaCalendarAlt className="me-2" />
              Bookings
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              className="nav-link text-white d-flex align-items-center"
              to="/admin/buses"
            >
              <FaBus className="me-2" />
              Buses
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              className="nav-link text-white d-flex align-items-center"
              to="/admin/addbus"
            >
              <FaBus className="me-2" />
              Add Bus
            </Link>
          </li>
          <li className="nav-item mt-auto pt-3 border-top">
            <button
              className="btn btn-link nav-link text-white d-flex align-items-center"
              onClick={handleLogout}
              style={{ textDecoration: "none" }}
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
