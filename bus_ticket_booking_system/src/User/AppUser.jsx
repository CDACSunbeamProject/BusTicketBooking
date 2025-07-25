import { Routes, Route, useLocation } from "react-router-dom";
import Search from "./pages/Search";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import SeatSelection from "./pages/SeatSelection";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import CancelTicket from "./pages/CancelTicket";
import MyBookings from "./pages/MyBookings";
import Ticket from "./pages/Ticket";
import ViewTicket from "./pages/ViewTicket";
import Profile from "./pages/Profile";
import ViewBuses from "./pages/ViewBuses";
import Payment from "./pages/payment";
import Home from "./pages/Home";

function AppUser() {
  const location = useLocation();
  const hideNavbarPaths = [
    "/user/forgotpassword",
  ];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="search" element={<Search />} />
        <Route path="seatselection" element={<SeatSelection />} />
        <Route path="cancelticket" element={<CancelTicket />} />
        <Route path="mybookings" element={<MyBookings />} />
        <Route path="ticket" element={<Ticket />} />
        <Route path="viewticket" element={<ViewTicket />} />
        <Route path="profile" element={<Profile />} />
        <Route path="viewbuses" element={<ViewBuses />} />
        <Route path="payment" element={<Payment/>} />
        <Route path="home" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default AppUser;
