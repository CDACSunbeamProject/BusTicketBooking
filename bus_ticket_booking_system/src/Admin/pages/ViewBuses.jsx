import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewBuses() {
  const [buses, setBuses] = useState([
    { id: 1, busNumber: "MH-01-1234", busType: "AC", seatType: "sleeper" },
    {
      id: 2,
      busNumber: "KA-02-5678",
      busType: "Non-AC",
      seatType: "sleeper",
    },
    { id: 3, busNumber: "MH-03-9101", busType: "AC", seatType: "seater" },
    {
      id: 4,
      busNumber: "MH-04-1121",
      busType: "AC",
      seatType: "sleeper",
    },
  ]);
  const navigate = useNavigate();
  return (
    <div className="container medium-size-page mt-5 bg-light border shadow-sm rounded-4">
      <div className="row header-color rounded-top-4 p-2 text-white justify-content-center">
        <div className="fw-semibold fs-3 text-center">All Buses</div>
      </div>
      <div className="row shadow m-5 p-0">
        <div className="p-0 m-0">
          <table className="table text-center border-primary">
            <thead className="table-info login-header">
              <tr className="align-middle">
                <th>Bus Id</th>
                <th>Bus Number</th>
                <th>Bus Type</th>
                <th>Seat Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus.id} className="align-middle">
                  <td>{bus.id}</td>
                  <td>{bus.busNumber}</td>
                  <td>{bus.busType}</td>
                  <td>{bus.seatType}</td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewBuses;
