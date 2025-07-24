import React from 'react';


const UserInfo = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Booking Info</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Sr.No</th>
              <th>Bus ID</th>
              <th>Name</th>
              <th>Mobile No.</th>
              <th>Email</th>
              <th>Address</th>
              <th>Route</th>
              <th>Pickup Point</th>
              <th>Pickup Date & Time</th>
              <th>Drop Point</th>
              <th>Drop Date & Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>B101</td>
              <td>Priya Desai</td>
              <td>9876543210</td>
              <td>priya@example.com</td>
              <td>Shivaji Nagar, Pune</td>
              <td>Pune → Mumbai</td>
              <td>Swargate</td>
              <td>2025-07-25, 08:00 AM</td>
              <td>Dadar</td>
              <td>2025-07-25, 11:30 AM</td>
            </tr>
            <tr>
              <td>2</td>
              <td>B102</td>
              <td>Rahul Jain</td>
              <td>8765432109</td>
              <td>rahulj@example.com</td>
              <td>Kothrud, Pune</td>
              <td>Pune → Nashik</td>
              <td>Katraj</td>
              <td>2025-07-26, 06:00 AM</td>
              <td>CBS Nashik</td>
              <td>2025-07-26, 10:00 AM</td>
            </tr>
            <tr>
              <td>3</td>
              <td>B103</td>
              <td>Sneha Patil</td>
              <td>9988776655</td>
              <td>sneha.p@gmail.com</td>
              <td>Hinjewadi, Pune</td>
              <td>Pune → Bangalore</td>
              <td>Hinjewadi</td>
              <td>2025-07-27, 07:00 PM</td>
              <td>Majestic</td>
              <td>2025-07-28, 06:30 AM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInfo;
