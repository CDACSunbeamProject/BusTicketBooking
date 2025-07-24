import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
function ViewBuses() {
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
    <div className="container-sm  mt-5 mb-5 bg-light border shadow rounded-4">
      <div className="row justify-content-center align-items-center text-center">
        <div className="fs-4 rounded-top-4 header-color pt-2 pb-3 fw-medium p-2 text-white">
          Bus Details
        </div>
      </div>
      <div>
        <div className="row m-1 mt-5 mb-3 p-1 justtify-content-center align-items-center text-center">
          <div className="border border-dark m-0 p-0">
            <table className="table m-0 border-dark shadow text-center">
              <thead>
                <tr className=" border-dark table-primary align-middle">
                  <th>Sr.No</th>
                  <th>Bus ID</th>
                  <th>Bus Number</th>
                  <th>Route</th>
                  <th>Pickup Point</th>
                  <th>Drop Point</th>
                  <th>Bus Type</th>
                  <th>Departure Date & Time</th>
                  <th>Arrival Date & Time</th>
                  <th>Fare (₹)</th>
                  <th>Amenities</th>
                  <th>Photo</th>
                </tr>
              </thead>
              <tbody className="table-bordered ">
                <tr>
                  <td>1</td>
                  <td>B101</td>
                  <td>MH12AB1234</td>
                  <td>Pune → Mumbai</td>
                  <td>Swargate</td>
                  <td>Dadar</td>
                  <td>AC Sleeper</td>
                  <td>2025-07-25, 08:00 AM</td>
                  <td>2025-07-25, 11:30 AM</td>
                  <td>500</td>
                  <td>Wi-Fi, Water Bottle</td>
                  <td>Photo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>B102</td>
                  <td>MH14CD5678</td>
                  <td>Pune → Nashik</td>
                  <td>Shivajinagar</td>
                  <td>CBS Nashik</td>
                  <td>Non-AC Seater</td>
                  <td>2025-07-25, 06:30 AM</td>
                  <td>2025-07-25, 10:30 AM</td>
                  <td>350</td>
                  <td>Water Bottle</td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>B103</td>
                  <td>MH20EF9012</td>
                  <td>Pune → Bangalore</td>
                  <td>Katraj</td>
                  <td>Majestic</td>
                  <td>AC Sleeper</td>
                  <td>2025-07-25, 06:00 PM</td>
                  <td>2025-07-26, 07:00 AM</td>
                  <td>1200</td>
                  <td>Wi-Fi, Charging Point</td>
                  <td></td>
                </tr>
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

export default ViewBuses;