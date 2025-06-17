import { Routes, Route } from 'react-router-dom';
import Search from './pages/Search';

function AppUser(){
    return (
        <div>
            {/** user navbar */}
            <Routes>
                <Route path='search' element={<Search />} />
            </Routes>
        </div>
    );
}

export default AppUser;