import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

function Routes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    axios
      .get("http://localhost:9090/buses/getroutes")
      .then((res) => {
        setRoutes(res.data);
      })
      .catch(() => {
        setError("Failed to load routes");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading routes...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  // Filter routes based on searchTerm in startLocation or endLocation
  const filteredRoutes = routes.filter((route) =>
    Object.values(route).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container my-5 pb-5 ">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">All Routes</h2>
            <div className="input-group" style={{ width: "400px" }}>
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search routes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search routes"
              />
            </div>
          </div>
        </div>

        <div className="card-body">
          {filteredRoutes.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">
                {routes.length === 0
                  ? "No routes found"
                  : "No matching routes found"}
              </h4>
            </div>
          ) : (
            <div className="container shadow-sm">
              <div className="container fs-5 fw-bold">
                <div className="row justify-connect-center border-bottom align-items-center p-2 ps-5 bg-info">
                  <div className="col">#</div>
                  <div className="col">Start Location</div>
                  <div className="col">End Location</div>
                </div>
              </div>
              <div className="container">
                {filteredRoutes.map((route, index) => (
                  <div key={index+1} className="row p-3 ps-5 border-bottom table-striped">
                    <div className="col">{index + 1}</div>
                    <div className="col">{route.startLocation}</div>
                    <div className="col">{route.endLocation}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Routes;
