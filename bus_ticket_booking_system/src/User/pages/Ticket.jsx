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
        <button onClick={() => navigate(-1)} className="btn btn-primary">
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
          <div className="mb-4 p-3 border rounded">
            <h4 className="text-primary mb-3">
              <i className="fas fa-users me-2"></i>Passengers
            </h4>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-primary">
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Seat Number</th>
                  </tr>
                </thead>
                <tbody>
                  {ticket?.passengers?.length > 0 ? (
                    ticket.passengers.map((p, index) => (
                      <tr key={index}>
                        <td>{p.name}</td>
                        <td>{p.age}</td>
                        <td>{p.gender}</td>
                        <td>{p.seatNo}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center text-muted">
                        No passengers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-evenly m-4">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-secondary col-2"
            >
              <i className="fas fa-arrow-left "></i>Back
            </button>
            <button onClick={() => window.print()} className="btn btn-primary col-2">
              <i className="fas fa-print"></i>Print Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
