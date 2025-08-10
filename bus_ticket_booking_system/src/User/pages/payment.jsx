import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance";

function Payment() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: ""
  });
  const [upiDetails, setUpiDetails] = useState({
    upiId: ""
  });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      // For now, we'll use the bookingId to construct booking details
      // In a real application, you would fetch this from the backend
      const bookingDetails = {
        bookingId: bookingId,
        busName: "Luxury Express",
        from: "Mumbai",
        to: "Pune",
        date: "2025-08-15",
        time: "20:00",
        seats: ["A1", "A2"],
        totalAmount: 5000,
        passengerName: "John Doe",
        passengerPhone: "9876543210"
      };
      setBooking(bookingDetails);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching booking details:", error);
      toast.error("Failed to load booking details");
      setLoading(false);
    }
  };

  const handleCardInputChange = (field, value) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpiInputChange = (field, value) => {
    setUpiDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateCardDetails = () => {
    if (!cardDetails.cardNumber || cardDetails.cardNumber.length !== 16) {
      toast.error("Please enter a valid 16-digit card number");
      return false;
    }
    if (!cardDetails.cardHolder) {
      toast.error("Please enter card holder name");
      return false;
    }
    if (!cardDetails.expiryMonth || !cardDetails.expiryYear) {
      toast.error("Please enter expiry date");
      return false;
    }
    if (!cardDetails.cvv || cardDetails.cvv.length !== 3) {
      toast.error("Please enter a valid 3-digit CVV");
      return false;
    }
    return true;
  };

  const validateUpiDetails = () => {
    if (!upiDetails.upiId || !upiDetails.upiId.includes('@')) {
      toast.error("Please enter a valid UPI ID (e.g., name@upi)");
      return false;
    }
    return true;
  };

  const processPayment = async () => {
    let isValid = false;

    if (paymentMethod === "card") {
      isValid = validateCardDetails();
    } else if (paymentMethod === "upi") {
      isValid = validateUpiDetails();
    }

    if (!isValid) return;

    setProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate fake payment response
      const paymentData = {
        bookingId: bookingId,
        paymentMethod: paymentMethod,
        amount: booking.totalAmount,
        transactionId: `TXN${Date.now()}`,
        status: "SUCCESS"
      };

      // Call ticket generation API
      const response = await axiosInstance.post("/users/ticket", {
        bookingId: bookingId,
        paymentMethod: paymentMethod,
        amount: booking.totalAmount,
        transactionId: `TXN${Date.now()}`,
        status: "SUCCESS"
      });

      toast.success("Payment successful! Redirecting to ticket...");

      // Navigate to ticket page
      setTimeout(() => {
        navigate(`/ticket/${response.data.ticketNumber}`);
      }, 1500);

    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h4>Booking not found</h4>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="payment-container">
            {/* Header */}
            <div className="payment-header">
              <h3>💳 Payment Gateway</h3>
              <p className="text-muted">Complete your booking by making the payment</p>
            </div>

            {/* Booking Summary */}
            <div className="booking-summary-card">
              <h5>Booking Summary</h5>
              <div className="summary-grid">
                <div className="summary-item">
                  <span>Booking ID:</span>
                  <span>{booking.id}</span>
                </div>
                <div className="summary-item">
                  <span>Bus:</span>
                  <span>{booking.bus?.busName}</span>
                </div>
                <div className="summary-item">
                  <span>Route:</span>
                  <span>{booking.bus?.startLocation} → {booking.bus?.endLocation}</span>
                </div>
                <div className="summary-item">
                  <span>Seats:</span>
                  <span>{booking.passengers?.length || 0} seats</span>
                </div>
                <div className="summary-item total">
                  <span>Total Amount:</span>
                  <span>₹{booking.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="payment-method-section">
              <h5>Select Payment Method</h5>
              <div className="payment-methods">
                <div
                  className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="method-icon">💳</div>
                  <div className="method-info">
                    <h6>Credit/Debit Card</h6>
                    <p>Pay with your card</p>
                  </div>
                </div>
                <div
                  className={`payment-method ${paymentMethod === 'upi' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <div className="method-icon">📱</div>
                  <div className="method-info">
                    <h6>UPI Payment</h6>
                    <p>Pay with UPI</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="payment-form-section">
              {paymentMethod === 'card' ? (
                <div className="card-payment-form">
                  <h5>Card Details</h5>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label className="form-label">Card Number *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.cardNumber}
                        onChange={(e) => handleCardInputChange('cardNumber', formatCardNumber(e.target.value))}
                        maxLength="19"
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Card Holder Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="JOHN DOE"
                        value={cardDetails.cardHolder}
                        onChange={(e) => handleCardInputChange('cardHolder', e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Expiry Month *</label>
                      <select
                        className="form-select"
                        value={cardDetails.expiryMonth}
                        onChange={(e) => handleCardInputChange('expiryMonth', e.target.value)}
                      >
                        <option value="">MM</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                          <option key={month} value={month.toString().padStart(2, '0')}>
                            {month.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Expiry Year *</label>
                      <select
                        className="form-select"
                        value={cardDetails.expiryYear}
                        onChange={(e) => handleCardInputChange('expiryYear', e.target.value)}
                      >
                        <option value="">YYYY</option>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">CVV *</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                        maxLength="3"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="upi-payment-form">
                  <h5>UPI Details</h5>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label className="form-label">UPI ID *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="name@upi"
                        value={upiDetails.upiId}
                        onChange={(e) => handleUpiInputChange('upiId', e.target.value)}
                      />
                      <div className="form-text">
                        Enter your UPI ID (e.g., john@okicici, jane@paytm)
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="security-notice">
              <div className="security-icon">🔒</div>
              <div className="security-text">
                <h6>Secure Payment</h6>
                <p>Your payment information is encrypted and secure. We use industry-standard SSL encryption.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="payment-actions">
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate(`/seatselection`)}
                disabled={processing}
              >
                ← Back to Booking
              </button>
              <button
                className="btn btn-primary"
                onClick={processPayment}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Processing...
                  </>
                ) : (
                  `Pay ₹${booking.totalAmount}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
