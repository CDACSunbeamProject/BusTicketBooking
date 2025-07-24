import { Link } from 'react-router-dom'

function Dashboard(){
    return(
        <div className="container">
            <h2 className="mb-4">Admin Dashboard</h2>
            <div className="row g-4">
            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Add Bus</h5>
                        <p className="card-text">Add a new bus to the system.</p>
                        <Link to='/Admin/addbus' className='btn btn-primary'>Go</Link>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">View Bus</h5>
                        <p className="card-text">View buses option</p>
                        <Link to='/Admin/ViewBuses' className='btn btn-primary'>Go</Link>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">Bookings</h5>
                        <p className="card-text">View all bookings.</p>
                        <Link to='/Admin/Bookings' className='btn btn-primary'>Go</Link>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">User Information</h5>
                        <p className="card-text">View User Information</p>
                        <Link to='/Admin/UserInfo' className='btn btn-primary'>Go</Link>
                    </div>
                </div>
            </div>

            </div>
        </div>
    );
}
export default Dashboard;