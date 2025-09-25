import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setemailId] = useState(""); 
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      console.log("Attempting login with:", { emailId, password: "***" });
      
      const res = await axios.post(BASE_URL + "/login", {
        emailId, 
        password,
      }, {
        withCredentials: true  // Important for cookies
      });
      
      console.log("Login successful:", res.data);
      console.log("Response headers:", res.headers);
      console.log("Document cookies after login:", document.cookie);
      
      // Dispatch user data to Redux
      dispatch(addUser(res.data));
      
      // Navigate to home page
      navigate("/");
      
    } catch (error) {
      console.log("Login error:", error);
      console.log("Error response:", error.response?.data);
      
      // Show user-friendly error message
      if (error.response?.status === 400) {
        alert("Login failed: " + (error.response?.data || "Invalid credentials"));
      } else {
        alert("Login failed: Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>       
          
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="email"
                className="input"
                value={emailId}
                placeholder="Enter your email"
                onChange={(e) => setemailId(e.target.value)}
                disabled={isLoading}
              />
            </fieldset>
            
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </fieldset>
          </div>
          
          <div className="card-actions justify-center">
            <button 
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`} 
              onClick={handleLogin}
              disabled={isLoading || !emailId || !password}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div className="text-center mt-4">
            <p>Don't have an account?</p>
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up Here
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;