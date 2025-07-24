import React from 'react';
import { useNavigate } from 'react-router-dom';

const BusInfo = () => {
  const navigate = useNavigate();
  const handleAddBus = () => {
    navigate("/admin/addbus");
  }
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Bus Details</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
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
              <td>{/* Leave blank or use a placeholder image */}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2" onClick={handleAddBus}
                >
                  Add
                </button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
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
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={handleAddBus}
                >
                  Add
                </button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
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
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={handleAddBus}
                  >
                    Add
                  </button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusInfo;
