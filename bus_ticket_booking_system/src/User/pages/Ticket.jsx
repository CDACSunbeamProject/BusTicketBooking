import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function TicketDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticketId } = location.state || {};

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(ticketId);
    if (!ticketId) {
      setError("No ticketId provided");
      setLoading(false);
      return;
    }

    // Fetch ticket info from backend
    axios
      .post("http://localhost:9090/tickets/ticket", ticketId, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setTicket(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch ticket information");
        setLoading(false);
        console.error(err);
      });
  }, [ticketId]);

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  if (error)
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <p className="mb-0">{error}</p>
        </div>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Go Back
        </button>
      </div>
    );

  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0 p-2 text-center">Ticket Details</h3>
        </div>

        <div className="card-body ms-md-5 me-md-5">
          {/* Ticket Info Section */}
          <div className="mb-4 p-3 border rounded">
            <h4 className="text-primary mb-3">
              <i className="fas fa-ticket-alt me-2"></i>Ticket Info
            </h4>
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Ticket Number:</strong>
                  <br />
                  {ticket.ticketNumber}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Generated At:</strong>
                  <br />
                  {new Date(ticket.generatedAt).toLocaleString()}
                </p>
              </div>
              {/* <div className="col-md-4">
                <p>
                  <strong>Status:</strong>
                  <br />
                  <span
                    className={`badge ${
                      ticket.status === "CONFIRMED"
                        ? "bg-success"
                        : "bg-warning"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </p>
              </div> */}
            </div>
          </div>

          {/* Booking Info Section */}
          <div className="mb-4 p-3 border rounded">
            <h4 className="text-primary mb-3">
              <i className="fas fa-calendar-check me-2"></i>Booking Info
            </h4>
            <div className="row">
              <div className="col-md-3">
                <p>
                  <strong>Booking ID:</strong>
                  <br />
                  {ticket.bookingId}
                </p>
              </div>
              <div className="col-md-3">
                <p>
                  <strong>User Name:</strong>
                  <br />
                  {ticket.userName}
                </p>
              </div>
              <div className="col-md-3">
                <p>
                  <strong>Travel Date:</strong>
                  <br />
                  {ticket.travelDate}
                </p>
              </div>
              <div className="col-md-3">
                <p>
                  <strong>Total Amount:</strong>
                  <br />₹{ticket.totalAmount}
                </p>
              </div>
            </div>
          </div>

          {/* Bus Info Section */}
          <div className="mb-4 p-3 border rounded">
            <h4 className="text-primary mb-3">
              <i className="fas fa-bus me-2"></i>Bus Info
            </h4>
            <div className="row">
              <div className="col-md-4">
                <p>
                  <strong>Bus Name:</strong>
                  <br />
                  {ticket.busName}
                </p>
                <p>
                  <strong>Bus Number:</strong>
                  <br />
                  {ticket.busNumber}
                </p>
                <p>
                  <strong>Operator:</strong>
                  <br />
                  {ticket.operatorName}
                </p>
              </div>
              <div className="col-md-4">
                <p>
                  <strong>Route:</strong>
                  <br />
                  {ticket.route}
                </p>
                <p>
                  <strong>Departure:</strong>
                  <br />
                  {ticket.departureDate} at {ticket.departureTime}
                </p>
                <p>
                  <strong>Arrival:</strong>
                  <br />
                  {ticket.arrivalDate} at {ticket.arrivalTime}
                </p>
              </div>
              <div className="col-md-4">
                <p>
                  <strong>Bus Type:</strong>
                  <br />
                  {ticket.busType}
                </p>
                <p>
                  <strong>Seat Type:</strong>
                  <br />
                  {ticket.seatType}
                </p>
              </div>
            </div>
          </div>

          {/* Passengers Section */}
          <div className="mb-4 p-4 border rounded shadow-sm bg-white">
            <h4 className="text-primary mb-3 d-flex align-items-center">
              <i className="fas fa-users me-2"></i> Passengers
            </h4>

            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle shadow-sm">
                <thead className="table-primary text-center">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Seat Number</th>
                  </tr>
                </thead>
                <tbody>
                  {ticket?.passengers?.length > 0 ? (
                    ticket.passengers.map((p, index) => (
                      <tr key={index} className="text-center">
                        <td className="fw-semibold">{p.name}</td>
                        <td>
                          <span className="badge fw-bold text-dark px-3 py-2">
                            {p.age}
                          </span>
                        </td>
                        <td>
                          <span className={`badge fw-bold text-dark px-3 py-2`}>
                            {p.gender}
                          </span>
                        </td>
                        <td>
                          <span className="badge text-dark fw-bold px-3 py-2">
                            {p.seatNo}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center text-muted py-4">
                        <i className="fas fa-info-circle me-2"></i>
                        No passengers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-evenly no-print m-4">
            <button
              onClick={() => navigate("/")}
              className="btn btn-secondary col-2"
            >
              <i className="fas fa-arrow-left "></i>Back
            </button>
            <button
              onClick={() => window.print()}
              className="btn btn-primary col-2"
            >
              <i className="fas fa-print"></i>Print Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
