import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext"; // assumes token stored here
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const { token } = useAuth(); // get token from context (or localStorage if you prefer)
  const [isEditable, setIsEditable] = useState(false);

  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",
  });

  // FETCH user profile on page load
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:9090/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const data = res.data;
      setUserDetails({
        firstname: data.firstname,
        lastName: data.lastName,
        email: data.email,
        age: data.age,
        gender: data.gender,
        mobile: data.phone, // use correct field from backend
        address: data.address,
      });
    })
    .catch((err) => {
      toast.error("Failed to load profile");
      console.error(err);
    });
  }, [token, navigate]);

  const handleSave = () => {
    axios.put("http://localhost:9090/users/update", userDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      toast.success("Profile updated successfully");
      setIsEditable(false);
    })
    .catch(() => {
      toast.error("Update failed");
    });
  };

  const handleEdit = () => setIsEditable(true);

  return (
    <div className="container mt-5 mb-5 pb-4 rounded-4 shadow medium-size-page">
      <div className="row header-color rounded-top-4 justify-content-center align-items-center text-center">
        <div className="fs-4 rounded-top-4 header-color pt-2 pb-3 fw-medium p-2 text-white">
          My Profile
        </div>
      </div>

      {/** First Name */}
      <div className="row m-4">
        <label className="form-label fw-medium fs-6">First Name</label>
        <input
          type="text"
          className="form-control"
          value={userDetails.firstname}
          readOnly={!isEditable}
          onChange={(e) => setUserDetails({ ...userDetails, firstname: e.target.value })}
        />
      </div>

      {/** Last Name */}
      <div className="row m-4">
        <label className="form-label fw-medium fs-6">Last Name</label>
        <input
          type="text"
          className="form-control"
          value={userDetails.lastName}
          readOnly={!isEditable}
          onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
        />
      </div>

      {/** Email */}
      <div className="row m-4">
        <label className="form-label fw-medium fs-6">Email Address</label>
        <input
          type="email"
          className="form-control"
          value={userDetails.email}
          readOnly
        />
      </div>

      {/** Age */}
      <div className="row m-4">
        <label className="form-label fw-medium fs-6">Age</label>
        <input
          type="number"
          className="form-control"
          value={userDetails.age}
          readOnly={!isEditable}
          onChange={(e) => setUserDetails({ ...userDetails, age: e.target.value })}
        />
      </div>

      {/** Gender */}
      <div className="row m-4">
        <label className="form-label fw-medium fs-6">Gender</label>
        <div>
          <input
            type="radio"
            className="form-check-input"
            name="gender"
            id="male"
            value="male"
            checked={userDetails.gender === "male"}
            disabled={!isEditable}
            onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })}
          />
          <label htmlFor="male" className="ms-2 me-4">Male</label>

          <input
            type="radio"
            className="form-check-input"
            name="gender"
            id="female"
            value="female"
            checked={userDetails.gender === "female"}
            disabled={!isEditable}
            onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })}
          />
          <label htmlFor="female" className="ms-2 me-4">Female</label>
        </div>
      </div>

      {/** Mobile */}
      <div className="row m-4">
        <label className="form-label fw-medium fs-6">Mobile No</label>
        <input
          type="tel"
          className="form-control"
          value={userDetails.mobile}
          readOnly={!isEditable}
          onChange={(e) => setUserDetails({ ...userDetails, mobile: e.target.value })}
        />
      </div>

      {/** Address */}
      <div className="row m-4">
        <label className="form-label fw-medium fs-6">Address</label>
        <input
          type="text"
          className="form-control"
          value={userDetails.address}
          readOnly={!isEditable}
          onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
        />
      </div>

      {/** Buttons */}
      <div className="row m-4">
        <div className="d-grid col-2">
          {isEditable ? (
            <button className="btn btn-success me-3" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="btn btn-primary me-3" onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
