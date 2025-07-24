import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    confirmPassword:''
  });
  const navigate = useNavigate();
  const handleForgotPassword = () => {
    alert("Password reset successful!");
    navigate("/user/signin");
  };
  const handleBack =() =>{
    navigate("/user/signin")
  }
  return (
    <div className="container mt-5 pb-4 rounded-4 shadow small-size-page">
      <div className="row header-color rounded-top-4 justify-content-center align-items-center text-center">
        <div className="fs-3 fw-medium p-2 text-white">Forgot Password</div>
      </div>
      <div className="row m-4 mb-3">
        <div>
          <label htmlFor="email" className="form-label fw-medium fs-6">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter Email Address"
            required
            value={loginDetails.email}
            onChange={(e) =>
              setLoginDetails({
                ...loginDetails,
                email: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="row m-4 mb-3 mt-3">
        <div>
          <label htmlFor="password" className="form-label fw-medium fs-6">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter Password"
            required
            value={loginDetails.password}
            onChange={(e) =>
              setLoginDetails({
                ...loginDetails,
                password: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="row m-4 mb-3 mt-3">
        <div>
          <label
            htmlFor="confirmPassword"
            className="form-label fw-medium fs-6"
          >
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter Confirm Password"
            required
            value={loginDetails.confirmPassword}
            onChange={(e) =>
              setLoginDetails({
                ...loginDetails,
                confirmPassword: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="row m-4 justify-content-evenly">
        <div className="d-grid col-3">
          <button className="btn btn-secondary" onClick={handleBack}>
            Back
          </button>
        </div>
        <div className="d-grid col-3">
          <button className="btn btn-warning" onClick={handleForgotPassword}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
