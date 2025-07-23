import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
function ViewTicket() {
  const [ticketDeatils, setTicketDeatils] = useState({
    ticketNo: "",
    mobile: "",
  });
  const navigate = useNavigate();
  const handleViewTicket = () => {
    navigate("/user/ticket");
  };
  return (
    <div className="container mt-5 pb-4 rounded-4 shadow small-size-page">
      <div className="row header-color rounded-top-4 justify-content-center align-items-center text-center">
        <div className="fs-4 rounded-top-4 header-color pt-2 pb-3 fw-medium p-2 text-white">
          View Ticket
        </div>
      </div>
      <div className="row m-4">
        <div>
          <label htmlFor="ticketno" className="form-label fw-medium fs-6">
            Ticket No
          </label>
          <input
            type="email"
            className="form-control"
            id="ticketno"
            name="ticketno"
            placeholder="Enter Ticket No"
            required
            value={ticketDeatils.ticketNo}
            onChange={(e) =>
              setTicketDeatils({
                ...ticketDeatils,
                ticketNo: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="row m-4">
        <div>
          <label htmlFor="password" className="form-label fw-medium fs-6">
            Mobile No
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobile"
            name="mobile"
            placeholder="Enter Mobile No"
            required
            value={ticketDeatils.ticketNo}
            onChange={(e) =>
              setTicketDeatils({
                ...ticketDeatils,
                mobile: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="row m-4 justify-content-center">
        <div className="d-grid col-4">
          <button
            className="btn fw-bold text-dark btn-primary p-2"
            onClick={handleViewTicket}
          >
            View Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewTicket;
