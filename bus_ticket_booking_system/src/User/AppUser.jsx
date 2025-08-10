import Search from "./pages/Search";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import SeatSelection from "./pages/SeatSelection";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import CancelTicket from "./pages/CancelTicket";
import MyBookings from "./pages/MyBookings";
import Ticket from "./pages/Ticket";
import ViewTicket from "./pages/ViewTicket";
import Profile from "./pages/Profile";
import ViewBuses from "./pages/ViewBuses";
import Payment from "./pages/payment";
import SearchResults from "./pages/searchResults";
import BusDetails from "./pages/BusDetails";
import Login from "./pages/Login";
// import PrivateRoute from "./pages/PrivateRoute";
import NewPayment from "./pages/NewPayment"

import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import About from "./pages/About";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
function AppUser() {
  const location = useLocation();
  const hideNavbarPaths = ["/forgotpassword"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="about" element={<About />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Private routes group */}
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="search" element={<Search />} />
        <Route path="seatselection" element={<SeatSelection />} />
        <Route path="cancelticket" element={<CancelTicket />} />
        <Route path="mybookings" element={<MyBookings />} />
        <Route path="ticket" element={<Ticket />} />
        <Route path="viewticket" element={<ViewTicket />} />
        <Route path="profile" element={<Profile />} />
        <Route path="viewbuses" element={<ViewBuses />} />
        <Route path="payment" element={<Payment />} />
        <Route path="newpayment" element={<NewPayment />} />
        <Route path="bus/:busId" element={<BusDetails />} />
        <Route path="searchresults" element={<SearchResults />} />
        {/* </Route> */}

        {/* Public routes */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
      {shouldShowNavbar && <Footer />}
    </div>
  );
}

export default AppUser;
