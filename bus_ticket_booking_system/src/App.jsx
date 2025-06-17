import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppAdmin from './Admin/AppAdmin';
import AppUser from './User/AppUser';

//FOR ROUTING 

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route  path="/Admin/*" element={<AppAdmin />} />
      <Route  path="/User/*" element={<AppUser />} />
      <Route path="*" element={<h1>Welcome to Bus Booking App</h1>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;