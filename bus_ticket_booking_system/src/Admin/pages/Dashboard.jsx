import { Link, useLocation } from "react-router-dom";
import {
  FaBus,
  FaListAlt,
  FaCalendarCheck,
  FaUsers,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
// import { useAuth } from "../../AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const token = localStorage.getItem("token") || "";
  const [info, setInfo] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
const cards = [
  {
    title: "Add Bus",
    description: "Add a new bus to the system",
    icon: <FaBus size={24} />,
    link: "/admin/addbus",
    color: "primary",
  },
  {
    title: "View Buses",
    description: "View and manage all buses",
    icon: <FaListAlt size={24} />,
    link: "/admin/buses",
    color: "success",
  },
  {
    title: "Bookings",
    description: "View all bookings",
    icon: <FaCalendarCheck size={24} />,
    link: "/admin/bookings",
    color: "info",
  },
  {
    title: "Users",
    description: "Manage system users",
    icon: <FaUsers size={24} />,
    link: "/admin/users",
    color: "warning",
  },
];
  useEffect(() => {
    if(!token)
      return
    console.log("inside useEffect");
    const loadInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/admin/summary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setInfo(response.data);
      } catch (err) {
        setError("Failed to load buses");
        console.error("Error loading buses:", err);
      } finally {
        setLoading(false);
      }
    };
    if (token) loadInfo();
    else setLoading(false); // no token, stop loading
  }, [token]);

  if (loading) return <div className="text-center my-5">Loading buses...</div>;
  if (error)
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  return (
    <div className="container">
      <div className="text-center mb-3 mt-3">
        <div className="display-5 fw-bold text-primary">Admin Dashboard</div>
        <p className="lead text-muted">Manages bus reservation system</p>
      </div>
      {/* Stats Section */}
      <div className="row mt-2 mb-5 g-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-uppercase text-muted">Total Buses</h6>
              <h2 className="mb-0">{info.totalBuses}</h2>
              {/* <span className="text-success small">+3 this week</span> */}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-uppercase text-muted">Active Bookings</h6>
              <h2 className="mb-0">{info.totalBookings}</h2>
              {/* <span className="text-success small">+12 today</span> */}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-uppercase text-muted">Registered Users</h6>
              <h2 className="mb-0">{info.totalUsers}</h2>
              {/* <span className="text-success small">+8 this week</span> */}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-uppercase text-muted">Revenue</h6>
              <h2 className="mb-0">₹ {info.totalAmount}</h2>
              {/* <span className="text-success small">+$1,240 this month</span> */}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {cards.map((card, index) => (
          <div key={index} className="col">
            <div
              className={`card border-0 shadow-sm h-100 hover-effect bg-${card.color}-subtle`}
            >
              <div className="card-body text-center">
                <div
                  className={`icon-circle bg-${card.color} text-white p-2 mb-3 mx-auto`}
                >
                  {card.icon}
                </div>
                <h3 className="h5 fw-bold">{card.title}</h3>
                <p className="text-muted mb-4">{card.description}</p>
                <Link
                  to={card.link}
                  className={`btn btn-${card.color} stretched-link`}
                >
                  Go to {card.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
