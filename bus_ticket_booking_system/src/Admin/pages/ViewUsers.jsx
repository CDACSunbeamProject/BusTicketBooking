import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  const handleDelete = (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setLoading(true);

    axios;
    axios
      .delete(`http://localhost:9090/admin/user/delete/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        // Remove the deleted user from the local state
        setUsers(users.filter((user) => user.id !== userId));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to delete user");
        setLoading(false);
      });
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">All Users</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Bookings Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>{user.bookings ? user.bookings.length : 0}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUsers;
