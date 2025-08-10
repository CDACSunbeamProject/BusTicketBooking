import React, { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";

function NewPayment() {
    //const [bookingData, setBookingData] = useState(null);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const location = useLocation();
    const navigate=useNavigate()
    const bookingData = location.state || {};

    const {
        busId,
        bus,
        selectedSeats,
        passengerDetails,
        totalAmount,
    } = bookingData;

    useEffect(() => {
        // Check if Razorpay script is already present
        if (document.getElementById("razorpay-script")) {
            setRazorpayLoaded(true);
            return;
        }

        // Create script element
        const script = document.createElement("script");
        script.id = "razorpay-it script";
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
            setRazorpayLoaded(true);
            console.log("Razorpay SDK loaded");
        };
        script.onerror = () => {
            alert("Failed to load Razorpay SDK. Please try again later.");
        };

        // Append to document head
        document.head.appendChild(script);

        // Cleanup if needed
        return () => {
            // Optional: you could remove script here if you want
        };
    }, []);


    const startPayment = async () => {
        try {
            // 2️⃣ Call backend to create order
            const { data } = await axios.post(
                "http://localhost:9090/payments/create-order",
                bookingData
            );
            console.log("Response from backend:", data);

            const { order_id, currency, totalfare, bookingId } = data;

            // 3️⃣ Configure Razorpay checkout
            const options = {
                key: "rzp_test_aQFXpZhWcUg44F", // ✅ Your public key from Razorpay dashboard
                amount: totalfare,
                currency: currency,
                name: "Bus Ticket Booking",
                description: `Booking for seats: ${bookingData.selectedSeats.join(", ")}`,
                order_id: order_id,
                handler: function (response) {
                    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

                    // 4️⃣ Verify payment on backend
                    axios
                      .post("http://localhost:9090/payments/verify", {
                        razorpay_order_id,
                        razorpay_payment_id,
                        razorpay_signature,
                        bookingId,
                      })
                      .then((verifyResponse) => {
                        console.log(
                          "Payment verification successful:",
                          verifyResponse.data
                        );

                        // Generate ticket after successful payment verification
                        return axios.post(
                          "http://localhost:9090/tickets/generate",
                          {
                            bookingId: bookingId,
                          },
                        );
                      })
                      .then((ticketResponse) => {
                        const ticketId = ticketResponse.data; // backend must return ticketId
                        console.log("Ticket generated:", ticketResponse.data);

                        // localStorage.clear();

                        // Navigate to ticket page with ticketId in state
                        navigate("/user/ticket", { state: { ticketId:ticketId } });
                      })
                      .catch((error) => {
                        console.error("Error occurred:", error);
                        alert(
                          "Payment verification or ticket generation failed!"
                        );
                      });

                },
                prefill: {
                    name: bookingData.passengerDetails[0]?.name, // First passenger name
                    email: localStorage.email, // can fetch from user profile
                    //contact: "9999999999"
                },
                theme: {
                    color: "#F37254"
                }
            };

            if (!window.Razorpay) {
                alert("Razorpay SDK not loaded yet. Please refresh or try again later.");
                return;
            }

            console.log("window.Razorpay:", window.Razorpay);

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error);
            alert("Error starting payment");
        }
    };

    if (!bookingData) return <h3>Loading booking details...</h3>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Complete Your Payment</h2>
            <p>Bus ID: {busId}</p>
            <p>Seat Nos: {selectedSeats.join(", ")}</p>
            <p>Total: ₹{totalAmount}</p>
            <button
                onClick={startPayment}
                style={{
                    background: "#F37254",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer"
                }}
            >
                Pay Now
            </button>
        </div>
    );
}

export default NewPayment;
