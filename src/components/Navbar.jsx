import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  
  const handleLogout = async () => {
    try {
   const res =  await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeUser());
    } catch (err) {
      console.log(err);
    }
  };

  // Don't show user profile on login/signup pages
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            ❤️ Tinder
          </Link>
        </div>
        {user && !isAuthPage && (
          <div className="flex gap-12 items-center">
            {/* MATCHES BUTTON */}
            <Link 
              to="/matches" 
              className="btn btn-ghost btn-sm bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Matches
            </Link>

            <div className="dropdown dropdown-end">
              <div className="flex items-center gap-2">
                <span className="welcome-text">Welcome, {user.firstName}</span>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="user photo" src={user.photoUrl} />
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests"> Requests</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
                
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;