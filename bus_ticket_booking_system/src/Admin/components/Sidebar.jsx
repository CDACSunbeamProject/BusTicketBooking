    import { Link, useNavigate } from "react-router-dom";
    import {
    FaTachometerAlt,
    FaUsers,
    FaCalendarAlt,
    FaBus,
    FaSignOutAlt,
    } from "react-icons/fa";

    function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add your logout logic here
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    return (
        <div className="bg-dark text-white vh-100 p-3" style={{ width: "220px" }}>
        <h4 className="text-center mb-4 border-bottom pb-3">Admin Panel</h4>
        <ul className="nav flex-column">
            <li className="nav-item mb-2">
            <Link
                className="nav-link text-white d-flex align-items-center"
                to="/admin/dashboard"
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
                to="/admin/viewbuses"
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
            <li className="nav-item mt-4 border-top pt-3">
            <button
                className="nav-link text-white d-flex align-items-center bg-transparent border-0 w-100"
                onClick={handleLogout}
            >
                <FaSignOutAlt className="me-2" />
                Logout
            </button>
            </li>
        </ul>
        </div>
    );
    }

    export default Sidebar;
