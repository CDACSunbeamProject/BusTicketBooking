import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewUsers() {
  const { token } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const loadInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/users/allusers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data)
        setUsers(response.data);
      } catch (err) {
        setError("Failed to load users");
        console.error("Error loading users:", err);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    loadInfo();
  }, [token]);

  const filteredUsers = users.filter((user) =>
    Object.values(user).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <FaSpinner className="fa-spin me-2" size={30} />
        <span>Loading users...</span>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center my-5">
        {error}
        <button
          className="btn btn-sm btn-outline-dark ms-3"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">All User Details</h2>
            <div className="input-group" style={{ width: "300px" }}>
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">
                {users.length === 0
                  ? "No users found"
                  : "No matching users found"}
              </h4>
            </div>
          ) : (
            <div className="table-responsive shadow-sm rounded">
              <table className="table table-hover text-center">
                <thead className="table-info">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Bookings</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td className="fw-semibold">{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.age ?? "-"}</td>
                      <td>{user.gender ?? "-"}</td>
                      <td>{user.phone ?? "-"}</td>
                      <td>
                        <span
                          className={`badge ${
                            user.role?.toLowerCase() === "admin"
                              ? "bg-danger"
                              : "bg-success"
                          }`}
                        >
                          {user.role ?? "-"}
                        </span>
                      </td>
                      <td>{user.noOfBookings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card-footer text-muted">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>
    </div>
  );
}

export default ViewUsers;
