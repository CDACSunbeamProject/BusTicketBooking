import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signin() {
  const [userLoginDetails, setUserLoginDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSignIn = () => {
    alert("Sign in successful!");
    navigate("/user");
  };
  return (
    <div className="container mt-5 pb-4 rounded-4 shadow small-size-page">
      <div className="row header-color rounded-top-4 justify-content-center align-items-center text-center">
        <div className="fs-3 fw-medium p-2">User Sign In</div>
      </div>
      <div className="row m-4">
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
            value={userLoginDetails.email}
            onChange={(e) =>
              setUserLoginDetails({
                ...userLoginDetails,
                email: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="row m-4">
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
            value={userLoginDetails.password}
            onChange={(e) =>
              setUserLoginDetails({
                ...userLoginDetails,
                password: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="row m-4 justify-content-center">
        <div className="d-grid gap-2 col-3 mx-auto">
          <button className="btn btn-primary" onClick={handleSignIn}>
            SIGN IN
          </button>
        </div>
      </div>
      <div className="row justify-content-center m-4">
        <div className="col align-items-evenly text-center">
          Forgot{" "}
          <a
            href="/user/forgotpassword"
            className="link-offset-2 link-underline link-underline-opacity-0"
          >
            Password?
          </a>
        </div>
        <div className="col align-items-evenly text-center">
          New User?{" "}
          <a
            href="/user/signup"
            className="link-offset-2 link-underline link-underline-opacity-0"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signin;
