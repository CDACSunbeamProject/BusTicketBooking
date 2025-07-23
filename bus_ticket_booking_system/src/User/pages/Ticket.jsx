
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Ticket() {
  const [ticketDeatils,setTicketDetails] = useState({
    ticketId: "12345",
    date: "2023-10-01",
    totalAmount: "1500",
    mobile: "9876543210",
    from: "City A",
    to: "City B",
    name: "John Doe",
    seatNo: "12",
  });
  const navigate=useNavigate()
  const handleDownload =() =>{
    alert("Ticket downloaded successfully!");
    navigate("/user")
  }
  return (
    <div className="container">
      <div className="container small-size-page rounded-5 border border-3 border-warning p-0 mt-5">
        <div className="row m-0 rounded-top-5 p-1 ticket-heading text-center text-white">
          <div className="col fs-2">🎫 BUS TICKET</div>
        </div>
        <div className="row ticket-body-part m-0 p-3">
          <div className="col text-start mt-2 mb-2">
            <span className="fw-bold">Ticket Id: </span>{" "}
            {ticketDeatils.ticketId}
          </div>
          <div className="mt-2 mb-2">
            <span className="fw-bold">Date: </span> {ticketDeatils.date}
          </div>

          <div className="mt-2 mb-2">
            <span className="fw-bold">Price: </span> ₹{" "}
            {ticketDeatils.totalAmount}
          </div>
        </div>
        <div className="row ticket-end-part rounded-bottom-5 m-0 p-3 ">
          <div className="">
            <span className="fw-bold">Name: </span> {ticketDeatils.name}
          </div>
          <div className="mt-3">
            <span className="fw-bold">Seat No: </span> {ticketDeatils.seatNo}
          </div>
          <div className="mt-3">
            <span className="fw-bold">Mobile No: </span> {ticketDeatils.mobile}
          </div>
          <div className="pt-3">
            <span className="fw-bold">From: </span> {ticketDeatils.from}
          </div>
          <div className="mt-3 mb-2">
            <span className="fw-bold">To: </span> {ticketDeatils.to}
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-3 align-items-center">
        <div className="d-grid col-1">
          <button
            className="btn btn-primary text-dark fw-bold"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
