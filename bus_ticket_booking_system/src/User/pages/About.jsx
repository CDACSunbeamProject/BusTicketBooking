import React from "react";

function About() {
  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white text-center">
          <h2 className="mb-0">About Us</h2>
        </div>
        <div className="card-body p-4">
          <p className="lead">
            Welcome to <strong>Route360</strong> — your trusted platform for
            hassle-free bus bookings. We believe traveling should be simple,
            affordable, and convenient.
          </p>

          <h4 className="mt-4 text-primary">Our Mission</h4>
          <p>
            To connect passengers with reliable bus operators and make the
            booking process as smooth as possible — from selecting your route to
            securing your seat.
          </p>

          <h4 className="mt-4 text-primary">What We Offer</h4>
          <ul>
            <li>Easy-to-use online booking system</li>
            <li>Real-time seat availability</li>
            <li>Secure payment options</li>
            <li>Instant e-ticket generation</li>
          </ul>

          <h4 className="mt-4 text-primary">Our Values</h4>
          <p>
            We are committed to transparency, reliability, and customer
            satisfaction. Your journey is our priority.
          </p>

          <div className="text-center mt-4">
            {/* <img
              src=""
              alt="BusEase Journey"
              className="img-fluid rounded shadow-sm"
            /> */}
          </div>
        </div>
        <div className="card-footer text-center p-3 bg-light">
          <small className="text-muted">
            &copy; {new Date().getFullYear()} ROute360. All rights reserved.
          </small>
        </div>
      </div>
    </div>
  );
}

export default About;
