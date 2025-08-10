import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { toast } from "react-toastify";
function Dashboard({ children }) {
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    // Simple validation
    if (!searchData.from.trim()) {
      toast.error("Please enter the starting location (From).");
      return;
    }
    if (!searchData.to.trim()) {
      toast.error("Please enter the destination (To).");
      return;
    }
    if (!searchData.date) {
      toast.error("Please select a travelling date.");
      return;
    }

    try {
      // Step 1: Get routeId from backend
      const routeRes = await axios.get(`http://localhost:9090/buses/routes`, {
        params: {
          startLocation: searchData.from,
          endLocation: searchData.to,
        },
      });
      const routeId = routeRes.data.id;
      console.log(routeId);

      // Step 2: Format date to dd-MM-yyyy
      const inputDate = new Date(searchData.date);
      const day = String(inputDate.getDate()).padStart(2, "0");
      const month = String(inputDate.getMonth() + 1).padStart(2, "0");
      const year = inputDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      // Step 3: Fetch buses for that route and date
      const busRes = await axios.get(`http://localhost:9090/buses/${routeId}`, {
        params: { jDate: formattedDate },
      });

      const buses = busRes.data;

      // Step 4: Save results in localStorage
      localStorage.setItem("searchResults", JSON.stringify(buses));
      localStorage.setItem("searchFrom", searchData.from);
      localStorage.setItem("searchTo", searchData.to);
      localStorage.setItem("searchDate", formattedDate);
      localStorage.setItem("routeId", routeId);

      navigate("/searchresults", {
        state: { routeId: routeId, jDate: searchData.date },
      });
    } catch (error) {
      console.error("Search failed:", error);
      toast.warn("Could not fetch buses. Please check your inputs.");
    }
  };

  return (
    <main className="container my-5" style={{height:"400px"}}>
      {/* Title */}
      <div className="text-center mb-4">
        <h1 className="fw-bold text-black">
          🚍 <span className="text-warning">Route360</span> Bus Booking
        </h1>
        <p className="text-muted fs-5">Find your perfect ride in seconds</p>
      </div>

      {/* Search inputs container (no form) */}
      <div className="card shadow-lg border-0 rounded-4 mt-5 p-5 bg-light">
        <div className="row gy-3 justify-content-center align-items-center">
          {/* FROM */}
          <div className="col-md-3">
            <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <i className="bi fs-5 bi-geo-alt-fill"></i>
              </span>
              <input
                type="text"
                name="from"
                className="form-control"
                placeholder="From"
                value={searchData.from}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* TO */}
          <div className="col-md-3">
            <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <i className="bi fs-5 bi-flag-fill"></i>
              </span>
              <input
                type="text"
                name="to"
                className="form-control"
                placeholder="To"
                value={searchData.to}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* DATE */}
          <div className="col-md-3">
            <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <i className="bi fs-5 bi-calendar-event-fill"></i>
              </span>
              <input
                type="date"
                name="date"
                className="form-control"
                value={searchData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* BUTTON */}
          <div className="col-md-2 d-grid">
            <button
              type="button"
              onClick={handleSearch}
              className="btn btn-primary btn-lg rounded-3 shadow-sm"
            >
              <i className="bi bi-search"></i> Search
            </button>
          </div>
        </div>
      </div>

      {/* Additional section for children */}
      <div className="mt-5">{children}</div>
    </main>
  );
}

export default Dashboard;
