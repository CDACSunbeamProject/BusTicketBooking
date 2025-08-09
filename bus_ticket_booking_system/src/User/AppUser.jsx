import { Routes, Route, useLocation } from "react-router-dom";
import Search from "./pages/Search";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import SeatSelection from "./pages/SeatSelection";
import Signin from "./pages/Login";
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
import BusDetails from "./pages/busDetails";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";


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
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />

        <Route path="search" element={<Search />} />
        <Route path="seatselection" element={<SeatSelection />} />
        <Route path="cancelticket" element={<CancelTicket />} />
        <Route path="mybookings" element={<MyBookings />} />
        <Route path="ticket" element={<Ticket />} />
        <Route path="viewticket" element={<ViewTicket />} />
        <Route path="profile" element={<Profile />} />
        <Route path="viewbuses" element={<ViewBuses />} />
        <Route path="payment" element={<Payment />} />
        <Route path="searchResults" element={<SearchResults />} />
       
        <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        <Route path="bus/:busId" element={<BusDetails />} />
        <Route path="searchresults" element={<SearchResults />} />
        
      </Routes>
    </div>
  );
}

export default AppUser;
