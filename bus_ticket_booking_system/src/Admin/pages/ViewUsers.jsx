import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("inside page")
    axios
      .get("http://localhost:9090/admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  // const handleDelete = (userId) => {
  //   if (!window.confirm("Are you sure you want to delete this user?")) return;

  //   setLoading(true);

  //   axios
  //     .delete(`http://localhost:9090/admin/user/delete/${userId}`, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     })
  //     .then(() => {
  //       setUsers(users.filter((user) => user.id !== userId));
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setError("Failed to delete user");
  //       setLoading(false);
  //     });
  // };

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <span className="fw-semibold">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary mb-0">
          <i className="bi bi-people-fill me-2"></i>All Users
        </h2>
        <span className="badge bg-primary fs-6">Total: {users.length}</span>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger shadow-sm" role="alert">
          {error}
        </div>
      )}

      {/* Users Table */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-dark text-center">
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
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} className="text-center">
                  <td>{index + 1}</td>
                  <td className="fw-semibold">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age ?? "-"}</td>
                  <td>{user.gender ?? "-"}</td>
                  <td>{user.phone ?? "-"}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin" ? "bg-danger" : "bg-success"
                      }`}
                    >
                      {user.role ?? "-"}
                    </span>
                  </td>
                  <td>{user.bookings?.length ?? 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewUsers;
