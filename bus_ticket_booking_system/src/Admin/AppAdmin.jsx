import { Routes,Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AddBuses1 from './pages/AddBuses1';
import ViewBuses from './pages/ViewBuses';
import Bookings from './pages/Bookings';
import BusDetails from './pages/BusDetails';
import ViewUsers from './pages/ViewUsers';

function AppAdmin(){
    return (
      <div>
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />

          <div className="flex-grow-1 p-4 bg-light" style={{ width: "100%" }}>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="addbus" element={<AddBuses1 />} />
              <Route path="viewbuses" element={<ViewBuses />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bus/:busId" element={<BusDetails />} />
              <Route path="users" element={<ViewUsers />} />
              <Route path="*" element={<h3>Page Not Found</h3>} />
            </Routes>
          </div>
        </div>
      </div>
    );
}
export default AppAdmin;