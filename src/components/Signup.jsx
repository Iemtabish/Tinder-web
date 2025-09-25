import React from "react";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:7777/signup", {
        firstName,
        lastName,
        emailId,
        password,
      }, {
        withCredentials: true  // Important for cookies
      });
      
      console.log("Signup successful:", response.data);
      console.log("Response headers:", response.headers);
      console.log("Document cookies after signup:", document.cookie);
      
      alert("Account created successfully! You can now login.");
      
      // Optional: Clear form after successful signup
      setFirstName("");
      setLastName("");
      setEmailId("");
      setPassword("");
      
    } catch (error) {
      console.log("Signup error:", error);
      console.log("Error response:", error.response?.data);
      alert("Signup failed: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Sign Up</h2>
          
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input"
                value={firstName}
                placeholder="Enter first name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input"
                value={lastName}
                placeholder="Enter last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
            
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="email"
                className="input"
                value={emailId}
                placeholder="Enter email"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                placeholder="Enter strong password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;