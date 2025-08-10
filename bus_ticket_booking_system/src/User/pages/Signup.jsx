import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {signupUser} from "../services/userService"
function Signup() {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    const requiredFields = [
      "name",
      "email",
      "password",
      "age",
      "gender",
      "phone",
    ];
    const firstEmpty = requiredFields.find((field) => !info[field]);

    if (firstEmpty) {
      toast.error(`${firstEmpty} is required`);
      document.querySelector(`[name="${firstEmpty}"]`)?.focus();
      return;
    }
    setError("");
    info.age=Number(info.age)
    try {
      const data = await signupUser(info);
      console.log("Full response from backend:", data);
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      console.error("Signup error:", err);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container mt-4 mb-4 pb-1 rounded-4 shadow small-size-page">
      <div className="row header-color rounded-top-4 justify-content-center align-items-center text-center">
        <div className="fw-medium p-2 fs-4 text-white">Sign Up</div>
      </div>
      <div className="m-4">
        <div className="mt-2 mb-3">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter full name"
            value={info.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email Address</label>
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="Enter email address"
            value={info.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={info.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Age</label>
          <input
            type="number"
            name="age"
            className="form-control"
            placeholder="Enter age"
            value={info.age}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="">Gender</label>
          <select
            value={info.gender}
            name="gender"
            onChange={(e) => setInfo({ ...info, gender: e.target.value })}
            className="form-select"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mt-3 mb-3">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            placeholder="Enter phone number"
            value={info.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="d-grid col-3 mx-auto m-2">
          <button className="btn btn-primary" onClick={handleSignup}>
            SIGN UP
          </button>
        </div>

        <div className="text-center">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
