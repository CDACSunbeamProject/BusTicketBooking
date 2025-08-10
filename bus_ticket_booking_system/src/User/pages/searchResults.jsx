import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBus, FaClock, FaStar, FaArrowRight, FaFilter } from "react-icons/fa";

function SearchResults() {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    seatType: [],
    acType: [],
    amenities: [],
  });

  const amenitiesList = [
    "Water Bottle",
    "WiFi",
    "Charging Point",
    "Reading Light",
    "TV",
    "CCTV",
    "First Aid Box",
    "Emergency Exit",
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const routeId = location?.state?.routeId || localStorage.getItem("routeId");
  const jDate = location?.state?.jDate || localStorage.getItem("searchDate");
  // Extract all unique filter options from buses
  const allSeatTypes = [...new Set(buses.map((bus) => bus.seatType))];
  const allAcTypes = [...new Set(buses.map((bus) => bus.acType))];

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        if (routeId && jDate) {
          const response = await axios.get(
            `http://localhost:9090/buses/${routeId}?jDate=${jDate}`
          );
          setBuses(response.data);
          setFilteredBuses(response.data);
        }
      } catch (err) {
        console.error("Error fetching buses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, [routeId, jDate]);

  useEffect(() => {
    // Apply filters whenever filters or buses change
    let result = buses;

    if (filters.seatType.length > 0) {
      result = result.filter((bus) => filters.seatType.includes(bus.seatType));
    }

    if (filters.acType.length > 0) {
      result = result.filter((bus) => filters.acType.includes(bus.acType));
    }

    if (filters.amenities.length > 0) {
      result = result.filter((bus) =>
        filters.amenities.every((amenity) => bus.amenities?.includes(amenity))
      );
    }

    setFilteredBuses(result);
  }, [filters, buses]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter((item) => item !== value);
      } else {
        newFilters[type] = [...newFilters[type], value];
      }
      return newFilters;
    });
  };

  const formatTime = (timeString) => {
    return timeString?.substring(0, 5);
  };

  const formatDuration = (hours) => {
    const hrs = Math.floor(hours);
    const mins = Math.round((hours - hrs) * 60);
    return `${hrs}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Finding available buses...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <button
          className="btn fw-bold bg-secondary text-white"
          onClick={() => navigate(-1)}
        >
          ← Back to search
        </button>
        <h2 className="mb-0 text-center fw-semibold">Available Buses</h2>
        <div style={{ width: "100px" }}></div>
      </div>

      <div className="row">
        {/* Filters Column - Left Side */}
        <div className="col-md-3 mb-4">
          <div
            className="card border-0 shadow-sm sticky-top"
            style={{ top: "20px" }}
          >
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center">
                <FaFilter className="me-2" />
                Filters
              </h5>

              <div className="mb-4">
                <h6 className="mt-3 mb-2">Seat Type</h6>
                <div className="d-flex flex-column gap-2">
                  {allSeatTypes.map((type) => (
                    <div key={type} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`seat-${type}`}
                        checked={filters.seatType.includes(type)}
                        onChange={() => handleFilterChange("seatType", type)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`seat-${type}`}
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h6 className="mt-3 mb-2">AC Type</h6>
                <div className="d-flex flex-column gap-2">
                  {allAcTypes.map((type) => (
                    <div key={type} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`ac-${type}`}
                        checked={filters.acType.includes(type)}
                        onChange={() => handleFilterChange("acType", type)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`ac-${type}`}
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h6 className="mt-3 mb-2">Amenities</h6>
                <div className="d-flex flex-column gap-2">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`amenity-${amenity}`}
                        checked={filters.amenities.includes(amenity)}
                        onChange={() =>
                          handleFilterChange("amenities", amenity)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`amenity-${amenity}`}
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-sm bg-secondary w-100 text-white "
                onClick={() =>
                  setFilters({ seatType: [], acType: [], amenities: [] })
                }
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        {/* Buses List Column - Right Side */}
        <div className="col-md-9">
          {filteredBuses.length === 0 ? (
            <div className="text-center py-5 border rounded bg-light">
              <p className="lead mb-3">
                {buses.length === 0
                  ? "No buses found for your search"
                  : "No buses match your filters"}
              </p>
              {buses.length > 0 && (
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() =>
                    setFilters({ seatType: [], acType: [], amenities: [] })
                  }
                >
                  Clear Filters
                </button>
              )}
              <button className="btn btn-primary" onClick={() => navigate("/")}>
                Try different search
              </button>
            </div>
          ) : (
            <div className="row g-3">
              {filteredBuses.map((bus) => (
                <div key={bus.id} className="col-12">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-3 ps-4 pe-4">
                      <div className="row align-items-center">
                        {/* Bus Info */}
                        <div className="col-md-4">
                          <div className="d-flex align-items-center mb-2">
                            <div className="bg-primary bg-opacity-10 p-2 rounded me-2">
                              <FaBus className="text-primary" />
                            </div>
                            <div>
                              <h5 className="mb-0 fw-semibold">
                                {bus.busName}
                              </h5>
                              <small className="text-muted">
                                {bus.operatorName}
                              </small>
                            </div>
                          </div>
                          <div className="d-flex gap-2 mb-2">
                            <span
                              className={`badge ${
                                bus.acType === "AC" ? "bg-info" : "bg-warning"
                              }`}
                            >
                              {bus.acType}
                            </span>
                            <span className="badge bg-secondary">
                              {bus.seatType}
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <FaStar className="text-warning me-1" />
                            <small>
                              {bus.rating
                                ? Number(bus.rating).toFixed(1)
                                : "N/A"}
                            </small>
                          </div>
                        </div>

                        {/* Journey Timeline */}
                        <div className="col-md-4">
                          <div className="d-flex justify-content-center align-items-center">
                            <div className="text-center">
                              <h6 className="fw-semibold mb-1">
                                {formatTime(bus.departureTime)}
                              </h6>
                              <small className="text-muted">
                                {bus.startLocation}
                              </small>
                            </div>
                            <div className="mx-3 text-center">
                              <div className="bg-light rounded-pill px-2 py-1 small">
                                <FaClock className="me-1 text-primary" />
                                {formatDuration(bus.duration)}
                              </div>
                              <FaArrowRight className="text-muted my-1" />
                            </div>
                            <div className="text-center">
                              <h6 className="fw-semibold mb-1">
                                {formatTime(bus.arrivalTime)}
                              </h6>
                              <small className="text-muted">
                                {bus.endLocation}
                              </small>
                            </div>
                          </div>
                          <div className="text-center mt-2 small text-muted">
                            {bus.departureDate} → {bus.arrivalDate}
                          </div>
                        </div>

                        {/* Price & Action */}
                        <div className="col-md-4">
                          <div className="d-flex flex-column align-items-end">
                            <h4 className="text-primary mb-2">
                              ₹{bus.price.toFixed(2)}
                            </h4>
                            <div className="d-flex align-items-center mb-3">
                              <div className="me-2 small text-muted">
                                {bus.noOfSeats - (bus.bookedSeats?.length || 0)}{" "}
                                seats left
                              </div>
                              <div
                                className="bg-success rounded-circle"
                                style={{ width: "8px", height: "8px" }}
                              ></div>
                            </div>
                            <Link
                              to="/seatselection"
                              state={{
                                busId: bus.id,
                              }}
                              className="btn btn-primary w-50"
                            >
                              Select Seats
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
