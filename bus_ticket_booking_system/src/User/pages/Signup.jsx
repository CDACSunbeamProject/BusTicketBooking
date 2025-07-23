import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [signupDetails, setSignupDetails] = useState({
    firstname: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",
  });
  const navigate = useNavigate();
  const handleSignUp = () => {
    alert("Sign up successful!");
    navigate("/user/signin");
  };
  return (
    <div className="container mt-5 mb-5 pb-4 rounded-4 shadow small-size-page">
      <div className="row header-color rounded-top-4 justify-content-center align-items-center text-center">
        <div className="fs-3 fw-medium p-2">User Sign Up</div>
      </div>
      <div className="row m-4 mt-3 mb-3">
        <div>
          <label htmlFor="firstName" className="form-label fw-medium fs-6">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            id="firstName"
            placeholder="Enter First Name"
            required
            value={signupDetails.firstname}
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                firstname: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="row m-4 mt-3 mb-3">
        <div>
          <label htmlFor="lastName" className="form-label fw-medium fs-6">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            placeholder="Enter Last Name"
            required
            value={signupDetails.lastName}
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                lastName: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="row m-4 mt-3 mb-3">
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
            value={signupDetails.email}
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                email: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="row m-4 mt-3 mb-3">
        <div>
          <label htmlFor="password" className="form-label fw-medium fs-6">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            required
            value={signupDetails.password}
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                password: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="row m-4 mt-3 mb-3">
        <div>
          <label className="form-label fw-medium fs-6">Gender</label>
        </div>
        <div>
          <input
            type="radio"
            className="form-check-input"
            id="male"
            name="gender"
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                gender: e.target.value,
              })
            }
          />
          <label htmlFor="male" className="ms-2 me-4">
            Male
          </label>
          <input
            type="radio"
            className="form-check-input"
            id="female"
            name="gender"
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                gender: e.target.value,
              })
            }
          />
          <label htmlFor="female" className="ms-2 me-4">
            Female
          </label>
        </div>
      </div>
      <div className="row m-4 mt-3 mb-3">
        <div>
          <label htmlFor="mobile" className="form-label fw-medium fs-6">
            Mobile No
          </label>
          <input
            type="tel"
            maxLength={10}
            minLength={10}
            className="form-control"
            name="mobile"
            id="mobile"
            placeholder="Enter Mobile No"
            required
            value={signupDetails.mobile}
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                mobile: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="row m-4 mt-3 mb-3">
        <div>
          <label htmlFor="address" className="form-label fw-medium fs-6">
            Last Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="Enter Address"
            required
            value={signupDetails.address}
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                address: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="row m-4 justify-content-center">
        <div className="d-grid gap-2 col-3 mx-auto">
          <button className="btn btn-primary" onClick={handleSignUp}>
            SIGN UP
          </button>
        </div>
      </div>
      <div className="row justify-content-center m-4">
        <div className="col align-items-evenly text-center">
          Already Registered?{" "}
          <a
            href="/user/signin"
            className="link-offset-2 link-underline link-underline-opacity-0"
          >
            {" "}
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
