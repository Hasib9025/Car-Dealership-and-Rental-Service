import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";


const NavBar = () => {
    const {user, logOut, loading} = useContext(AuthContext)
        const handleLogout = () =>{
        logOut()
        .then()
        .catch(error => console.error(error));
        }
    return (
        <div className="navbar bg-base-100 p-7">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                     </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Car Dealership</a></li>
                    <li><a>Parts selling</a></li>
                    <li><a href="RentalSystem">Rental System</a></li>
                </ul>
                </div>
                <a className="btn btn-ghost text-xl" href="/">GearUp</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Car Dealership</a></li>
                    <li><a>Parts selling</a></li>
                    <li><a href="RentalSystem">Rental System</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                { (user || loading) && 
                <div className="tooltip tooltip-top" data-tip={user?.displayName}>
                    <img
                        style={{ width: '25px', height: '25px', borderRadius: '50%' }}
                        className="img-fluid d-block group-hover:opacity-80 transition-opacity me-3"
                        src={user?.photoURL}
                        alt=""
                        />
              </div>
                }

                {user || loading ? (
                <button onClick={handleLogout} className="btn btn-outline btn-warning">Logout</button>
                ) : (
                <Link to="/login" className="btn btn-outline btn-warning px-md-2">
                    Login
                </Link>
                )}

            </div>
        </div>
    );
};


export default NavBar;