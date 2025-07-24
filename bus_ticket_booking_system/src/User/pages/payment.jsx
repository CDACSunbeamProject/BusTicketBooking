import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });
  const [upiId, setUpiId] = useState("");

  const handlePayment = () => {
    // TODO: Hook up to backend
    console.log("Processing payment...");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="mb-4">Complete Your Booking</h2>

        {/* Booking Summary */}
        <div className="border p-3 mb-4 rounded">
          <h5 className="mb-3">Booking Summary</h5>
          <p><strong>Route:</strong> Pune → Mumbai</p>
          <p><strong>Date:</strong> 26 July 2025 | 10:00 AM</p>
          <p><strong>Seats:</strong> B2, B3</p>
          <p><strong>Passenger:</strong> Aarya Gaikwad</p>
          <p><strong>Fare:</strong> ₹1050</p>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <h5 className="mb-3">Select Payment Method</h5>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
              id="cardOption"
            />
            <label className="form-check-label" htmlFor="cardOption">
              Credit/Debit Card
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
              id="upiOption"
            />
            <label className="form-check-label" htmlFor="upiOption">
              UPI
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              value="netbanking"
              checked={paymentMethod === "netbanking"}
              onChange={() => setPaymentMethod("netbanking")}
              id="netbankingOption"
            />
            <label className="form-check-label" htmlFor="netbankingOption">
              Net Banking
            </label>
          </div>
        </div>

        {/* Payment Details */}
        {paymentMethod === "card" && (
          <div className="mb-4">
            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                }
              />
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                />
              </div>
              <div className="col">
                <label className="form-label">CVV</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Name on Card</label>
              <input
                type="text"
                className="form-control"
                placeholder="Aarya Gaikwad"
                value={cardDetails.nameOnCard}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, nameOnCard: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="mb-4">
            <label className="form-label">Enter UPI ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="example@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        {paymentMethod === "netbanking" && (
          <div className="mb-4">
            <p>You will be redirected to your bank’s secure page.</p>
          </div>
        )}

        {/* Pay Button */}
        <button
          className="btn btn-primary w-100"
          onClick={handlePayment}
        >
          Pay Now ₹1050
        </button>

        <p className="text-muted text-center mt-3">
          <span className="me-2">🔒</span>100% Secure Payment
        </p>
      </div>
    </div>
  );
}

export default PaymentPage;
