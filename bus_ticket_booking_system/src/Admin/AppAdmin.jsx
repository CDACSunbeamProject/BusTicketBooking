import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddBuses1 from "./pages/AddBuses1";
import ViewBuses from "./pages/ViewBuses";
import Bookings from "./pages/Bookings";
import BusDetails from "./pages/BusDetails";
import ViewUsers from "./pages/ViewUsers";

function AppAdmin() {
  return (
    <div className="admin-app">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main
        className="main-content"
        style={{
          marginLeft: "220px", // Same as sidebar width
          paddingTop: "56px", // Same as navbar height
          minHeight: "calc(100vh - 56px)",
          width: "calc(100% - 220px)",
        }}
      >
        <div className="container-fluid p-4">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="addbus" element={<AddBuses1 />} />
            <Route path="buses" element={<ViewBuses />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bus/:id" element={<BusDetails />} />
            <Route path="users" element={<ViewUsers />} />
            <Route path="*" element={<h3>Page Not Found</h3>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default AppAdmin;
