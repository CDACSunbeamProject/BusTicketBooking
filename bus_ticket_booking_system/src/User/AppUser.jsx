import { Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import Navbar from './components/navbar';
import Dashboard from './components/dashboard';

function AppUser(){
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path='search' element={<Search />} />
            </Routes>
        </div>
    );
}

export default AppUser;
