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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId, 
        password,
      });
      console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      console.log(error);
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
                type="text"
                className="input"
                value={emailId}
                placeholder="Type here"
                onChange={(e) => setemailId(e.target.value)}
              />
            </fieldset>
            
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                placeholder="Type here"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
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