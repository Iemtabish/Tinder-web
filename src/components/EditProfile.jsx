import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      setIsLoading(true);
      setError("");
      setSuccess("");
      
      const profileData = { 
        firstName: firstName.trim(),
        lastName: lastName.trim(), 
        age: age ? parseInt(age) : undefined,
        photoUrl: photoUrl.trim(), 
        gender: gender.trim(), 
        about: about.trim()
      };

      Object.keys(profileData).forEach(key => {
        if (profileData[key] === undefined || profileData[key] === "") {
          delete profileData[key];
        }
      });
      
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        profileData,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      dispatch(addUser(res?.data?.data));
      setSuccess("Profile updated successfully!");
      
    } catch (err) {
      if (err.response?.status === 400) {
        setError(`Validation Error: ${err.response?.data || 'Invalid data provided'}`);
      } else if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else if (err.response?.data) {
        setError(err.response.data);
      } else {
        setError(err.message || "Failed to update profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
        
        {/* Edit Profile Form */}
        <div className="card bg-base-100 w-full max-w-md shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center mb-6">Edit Profile</h2>

            {/* Success Message */}
            {success && (
              <div className="alert alert-success mb-4">
                <span>{success}</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">First Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={firstName}
                  placeholder="Enter your First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Last Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={lastName}
                  placeholder="Enter your Last name"
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Photo URL</span>
                </label>
                <input
                  type="url"
                  className="input input-bordered w-full"
                  value={photoUrl}
                  placeholder="Your photo URL"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Age</span>
                </label>
                <input
                  type="number"
                  min="18"
                  max="100"
                  className="input input-bordered w-full"
                  value={age}
                  placeholder="Enter your Age"
                  onChange={(e) => setAge(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Gender</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">About</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows="3"
                  value={about}
                  placeholder="Tell us about yourself"
                  onChange={(e) => setAbout(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="card-actions justify-center mt-6">
              <button
                className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
                disabled={isLoading || !firstName.trim() || !lastName.trim()}
                onClick={saveProfile}
              >
                {isLoading ? "Saving..." : "Save Profile"}
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm">Don't have an account?</p>
              <Link to="/signup" className="link link-primary">
                Sign Up Here
              </Link>
            </div>
          </div>
        </div>
        
        {/* User Card Preview */}
        <div className="w-full max-w-md">
          <UserCard user={{ 
            firstName: firstName || "First Name", 
            lastName: lastName || "Last Name", 
            photoUrl: photoUrl || "https://via.placeholder.com/400x300?text=No+Image", 
            age: age || "Age", 
            gender: gender || "Gender", 
            about: about || "About yourself" 
          }} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;