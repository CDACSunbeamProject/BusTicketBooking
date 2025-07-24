import { Link } from "react-router-dom";

function Sidebar(){
    return(
        <div className="bg-dark text-white vh-100 p-3" style={{width: '200px'}}>
            <h4>Admin</h4>
            <ul className="nav flex-column">
                <li className="nav-item"><Link className="nav-link text-white" to="/Admin/dashboard">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/users">User</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/settings">Settings</Link></li>
            </ul>
        </div>
    );
}
export default Sidebar;