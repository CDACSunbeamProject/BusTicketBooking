import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { loginUser } from "../services/userService";
import { toast } from "react-toastify";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const requiredFields = ["email", "password"];
    const firstEmpty = requiredFields.find((field) => !loginDetails[field]);

    if (firstEmpty) {
      toast.error(`${firstEmpty} is required`);
      document.querySelector(`[name="${firstEmpty}"]`)?.focus();
      return;
    }

    setError("");

    try {
      const data = await loginUser(loginDetails.email, loginDetails.password);

      console.log("Full response from backend:", data);
      const { jwt, email: userEmail, role } = data;

      login(jwt, userEmail, role);

      if (role === "ADMIN") {
        toast.success("admin login successful");
        navigate("/admin/dashboard");
      } else if (role === "USER") {
        toast.success("user login successful")
        navigate("/user/dashboard");
      } else {
        toast.error("Unknown user role");
      }
    } catch (err) {
      console.error("Login error response:", err);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5 mb-5 pb-4 rounded-4 shadow small-size-page">
      <div className="row header-color rounded-top-4 justify-content-center align-items-center text-center">
        <div className="fs-3 fw-medium p-2 text-white">Login</div>
      </div>

      <div className="m-4">
        <div className="mb-3">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter Email Address"
            value={loginDetails.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            value={loginDetails.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="d-grid col-3 mx-auto m-4 mb-3">
          <button className="btn btn-primary" onClick={handleLogin}>
            LOGIN
          </button>
        </div>

        <div className="text-center">
          Don't have an account? <a href="/user/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
