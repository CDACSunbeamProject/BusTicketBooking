import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppAdmin from './Admin/AppAdmin';
import AppUser from './User/AppUser';
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './Admin/pages/Dashboard';
import Sidebar from './Admin/components/Sidebar';
//import ListBuses from './Admin/pages/ListBuses';
//import AddBus from './Admin/services/AddBus';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//FOR ROUTING 
function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Admin/*" element={<AppAdmin />} />
        <Route path="/User/*" element={<AppUser />} />
        <Route path="*" element={<h1>Welcome to Bus Booking App</h1>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}
export default App;


