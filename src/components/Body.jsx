import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "./Login";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const location = useLocation();

  const fetchUser = async () => {
    // Don't fetch if user already exists or on public routes
    if (userData) return;
    
    const publicRoutes = ["/login", "/signup"];
    if (publicRoutes.includes(location.pathname)) return;

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch(removeUser());
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [location.pathname]); // Re-run when route changes

  // Allow only login and signup without authentication
  const publicRoutes = ["/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  // If user is not logged in and trying to access protected route
  if (!userData && !isPublicRoute) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;