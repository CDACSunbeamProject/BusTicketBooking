import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
function MyBookings() {
  const [bookings, setBookings] = useState([
    {
      ticketId: "TKT12345",
      userId: "USR67890",
      busNo: "KA-06-5678",
      from: "City A",
      to: "City B",
      date: "2023-10-01",
      seatsCount: "02",
      price: 1000,
    },
    {
      ticketId: "TKT54321",
      userId: "USR09876",
      busNo: "MH-14-1234",
      from: "City C",
      to: "City D",
      date: "2023-10-02",
      seatsCount: "03",
      price: 1800,
    },
    {
      ticketId: "TKT67890",
      userId: "USR54321",
      busNo: "AP-26-9101",
      from: "City E",
      to: "City F",
      date: "2023-10-03",
      seatsCount: "03",
      price: 1700,
    },
    {
      ticketId: "TKT11223",
      userId: "USR11223",
      busNo: "MH-04-1121",
      from: "City G",
      to: "City H",
      date: "2023-10-04",
      seatsCount: "01",
      price: 800,
    },
  ]);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/user");
  };
  return (
    <div className="container-sm medium-size-page mt-5 mb-5 bg-light border shadow rounded-4">
      <div className="row justify-content-center align-items-center text-center">
        <div className="fs-4 rounded-top-4 header-color pt-2 pb-3 fw-medium p-2 text-white">
          My Bookings
        </div>
      </div>
      <div>
        <div className="row m-5 mb-3 p-1 justtify-content-center align-items-center text-center">
          <div className="border border-dark m-0 p-0">
            <table className="table m-0 border-dark shadow text-center">
              <thead>
                <tr className=" border-dark table-primary align-middle">
                  <th>No.</th>
                  <th>Ticket Id</th>
                  <th>User Id</th>
                  <th>Bus No</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Date</th>
                  <th>No. Seats Booked</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody className="table-bordered ">
                {bookings.map((booking, index) => (
                  <tr key={index} className="align-middle bg-white">
                    <td>{index + 1}</td>
                    <td>{booking.ticketId}</td>
                    <td>{booking.userId}</td>
                    <td>{booking.busNo}</td>
                    <td>{booking.from}</td>
                    <td>{booking.to}</td>
                    <td>{booking.date}</td>
                    <td>{booking.seatsCount}</td>
                    <td>{booking.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row mt-3 mb-5 justify-content-center align-items-center text-center">
          <div className="d-grid col-2">
            <button className="btn fw-bold btn-warning" onClick={handleBack}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
