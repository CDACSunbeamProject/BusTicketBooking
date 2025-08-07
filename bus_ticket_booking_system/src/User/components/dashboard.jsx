import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";

function Dashboard({ children }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

      try {
      // Step 1: Get routeId from backend
      const routeRes = await axios.get(`http://localhost:9090/buses/routes`, {
        params: {
          startLocation: from,
          endLocation: to,
        },
      });
      const routeId = routeRes.data.id;

      // Step 2: Format date to dd-MM-yyyy
      const inputDate = new Date(date);
      const day = String(inputDate.getDate()).padStart(2, '0');
      const month = String(inputDate.getMonth() + 1).padStart(2, '0');
      const year = inputDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      // Step 3: Fetch buses for that route and date
      const busRes = await axios.get(`http://localhost:9090/buses/${routeId}`, {
        params: {
          jDate: formattedDate,
        },
      });

    const buses = busRes.data;

      // Step 4: Save results to localStorage (or use Context, if implemented)
    localStorage.setItem("searchResults", JSON.stringify(buses));
    localStorage.setItem("searchFrom", from);
    localStorage.setItem("searchTo", to);
    localStorage.setItem("searchDate", date);
    localStorage.setItem("searchDate", formattedDate);
    localStorage.setItem("routeId", routeId);

    navigate("/user/searchresults", {
  state: {
    routeId: routeId,
    jDate: date // in "yyyy-MM-dd" or "dd-MM-yyyy"
  }
});

    } catch (error) {
      console.error("Search failed:", error);
      alert("Could not fetch buses. Please check your inputs.");
    }
  };
  

  return (
    <main className="container my-5">
      <h1 className="text-center mb-4">Welcome to the Bus Ticket Booking System!</h1>

      <form
        className="row justify-content-center align-items-center g-2"
        onSubmit={handleSubmit}
      >
        {/* FROM */}
        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-geo-alt-fill"></i>
            </span>
            <input
              type="text"
              name="from"
              className="form-control"
              placeholder="From"
              required
              value={from}
        onChange={(e) => setFrom(e.target.value)}
            />
          </div>
        </div>

        {/* TO */}
        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-flag-fill"></i>
            </span>
            <input
              type="text"
              name="to"
              className="form-control"
              placeholder="To"
              required
               value={to}
        onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>

        {/* DATE */}
        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-calendar-event-fill"></i>
            </span>
            <input
              type="date"
              name="date"
              className="form-control"
              required
              value={date}
        onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* SEARCH BUTTON */}
        <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
            Search
            </button>
        </div>
      </form>

      <div className="mt-5">{children}</div>
    </main>
  );
};

export default Dashboard;
