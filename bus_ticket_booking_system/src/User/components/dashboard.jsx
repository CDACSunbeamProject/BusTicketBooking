import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Dashboard({ children }) {
  return (
    <main className="container my-5">
      <h1 className="text-center mb-4">Welcome to the Bus Ticket Booking System!</h1>

      <form
        className="row justify-content-center align-items-center g-2"
        onSubmit={(e) => {
          e.preventDefault();
          const from = e.target.from.value;
          const to = e.target.to.value;
          const date = e.target.date.value;
          alert(`Searching buses from ${from} to ${to} on ${date}`);
        }}
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
}

export default Dashboard;
