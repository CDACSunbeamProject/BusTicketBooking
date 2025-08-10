import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function NewPayment() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state || {};
  console.log(bookingData)
  const { busId, bus, selectedSeats, passengerDetails, totalAmount, userId } =
    bookingData;
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    // Load Razorpay script if not already present
    if (document.getElementById("razorpay-script")) {
      setRazorpayLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      setRazorpayLoaded(true);
      console.log("Razorpay SDK loaded");
    };
    script.onerror = () => {
      toast.error("Failed to load Razorpay SDK. Please try again later.");
    };
    document.head.appendChild(script);
  }, []);

  const startPayment = async () => {
    if (!razorpayLoaded) {
      toast.error("Payment SDK is not loaded yet. Please try again shortly.");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:9090/payments/create-order",
        bookingData
      );

      const { order_id, currency, totalfare, bookingId } = data;

      const options = {
        key: "rzp_test_aQFXpZhWcUg44F",
        amount: totalfare,
        currency: currency,
        name: "Bus Ticket Booking",
        description: `Booking for seats: ${selectedSeats.join(", ")}`,
        order_id: order_id,
        handler: function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          axios
            .post("http://localhost:9090/payments/verify", {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              bookingId,
            })
            .then(() => {
              return axios.post("http://localhost:9090/tickets/generate", {
                bookingId: bookingId,
              });
            })
            .then((ticketResponse) => {
              const ticketId = ticketResponse.data;
              toast.success("Payment successful! Ticket generated.");
              navigate("/ticket", { state: { ticketId } });
            })
            .catch((error) => {
              console.error(error);
              toast.error(
                "Payment verification or ticket generation failed. Please contact support."
              );
            });
        },
        prefill: {
          name: passengerDetails[0]?.name || "",
          email: localStorage.getItem("email") || "",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Error initiating payment. Please try again.");
    }
  };

  if (!bookingData || selectedSeats.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h4>No booking data found. Please go back and select seats first.</h4>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/searchresults")}
        >
          Back to Search
        </button>
      </div>
    );
  }

  const busDetails = bus || bookingData.busDetails || {};

  return (
    <div className="container mt-5">
      <div
        className="card shadow border rounded p-4 mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <div>
          <div className="mb-5 mt-3 fs-3 fw-bold text-center">
            Complete Your Payment
          </div>
        </div>

        {/* Bus Details */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-bus-front fs-1 me-4 ms-5 text-primary"></i>
            <div>
              <div className="mb-0 fw-bold">{busDetails.busName}</div>
              <div className="text-muted">
                {busDetails.busType} <br />
                {busDetails.acType} | {busDetails.seatType}
              </div>
            </div>
          </div>
          <div className="text-center me-5">
            <div className="fw-bold">₹ {totalAmount}</div>
            <div className="small text-muted">
              <i className="bi bi-star-fill text-warning"></i>{" "}
              {busDetails.rating}
            </div>
          </div>
        </div>

        {/* Journey */}
        <div className="row me-5 ms-4 mb-3">
          <div className="d-flex flex-column ms-2">
            <div className="d-flex justify-content-between">
              <span className="fw-bold">{busDetails.startLocation}</span>
              <span className="fw-bold">{busDetails.endLocation}</span>
            </div>
            <div className="progress" style={{ height: "3px" }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: "100%" }}
              ></div>
            </div>
            <div className="d-flex justify-content-between small text-muted">
              <span>{busDetails.departureDate}</span>
              <span>{busDetails.arrivalDate}</span>
            </div>
            <div className="d-flex justify-content-between small text-muted">
              <span>{busDetails.departureTime}</span>
              <span>{busDetails.arrivalTime}</span>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="row me-5 ms-4 ps-2 mt-3 mb-4">
          <p>
            <strong>Seats:</strong> {selectedSeats.join(", ")}
          </p>

          <p>
            <strong>Fare:</strong> ₹
            {totalAmount || 0}
          </p>
        </div>

        {/* Pay Button */}
        <button className="btn me-5 ms-5 btn-primary" onClick={startPayment}>
          Pay Now ₹ {totalAmount || 0}
        </button>

        <p className="text-muted text-center mt-3">
          <span className="me-2">🔒</span>100% Secure Payment
        </p>
      </div>
    </div>
  );
}

export default NewPayment;
