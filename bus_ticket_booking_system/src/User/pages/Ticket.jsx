
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Ticket() {
  const [ticketDeatils, setTicketDetails] = useState({
    ticketId: "12345",
    busNo: "MH-12-AB-1234",
    fromDateTime: "2025-07-25, 08:00 AM",
    toDateTime: "2025-07-25, 11:30 AM",
    mobile: "9876543210",
    email: "ram@gmail.com",
    from: "Pune",
    to: "Hyderabad",
    totalFare: 1700,
    passangers: [
      {
        seatNo: 13,
        name: "Jahn Dao",
        gender: "male",
        age: 25,
      },
      {
        seatNo: 14,
        name: "Anushka",
        gender: "female",
        age: 40,
      },
      {
        seatNo: 15,
        name: "Prabhas",
        gender: "male",
        age: 36,
      },
    ],
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
          <div className="mt-2 mb-2">
            <span className="fw-bold">Ticket Id : </span>{" "}
            {ticketDeatils.ticketId}
          </div>
          <div className="mt-2 mb-2">
            <span className="fw-bold">Bus Number : </span>{" "}
            {ticketDeatils.busNo}
          </div>
          <div className="mt-2 mb-2">
            <span className="fw-bold">Departure Date & Time : </span>{" "}
            {ticketDeatils.fromDateTime}
          </div>
          <div className="mt-2 mb-2">
            <span className="fw-bold">Arrival Date & Time : </span>{" "}
            {ticketDeatils.toDateTime}
          </div>
          <div className="mt-2 mb-2">
            <span className="fw-bold">From : </span> {ticketDeatils.from}
          </div>
          <div className="mt-2 mb-2">
            <span className="fw-bold">To : </span> {ticketDeatils.to}
          </div>
          <div className="mt-2 mb-2">
            <span className="fw-bold">Price: </span> ₹ {ticketDeatils.totalFare}
          </div>
        </div>
        <div className="row ticket-end-part rounded-bottom-5 m-0 p-3 ">
          <div>
            <div className="fs-6 fw-bold">Passangers Details</div>
            <div>
              <table className="table table-bordered text-center mt-2">
                <thead>
                  <tr className="table-secondary">
                    <th>Seat No</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketDeatils.passangers.map((passanger, index) => (
                    <tr
                      key={index}
                      className="align-middle bg-white table-light"
                    >
                      <td className="col">{passanger.seatNo}</td>
                      <td className="col">{passanger.name}</td>
                      <td className="col">{passanger.gender}</td>
                      <td className="col">{passanger.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
