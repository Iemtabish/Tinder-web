import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRequest, removeRequest } from "../utils/requestSlice";

// Store matches in localStorage to persist across components
const getMatchesFromStorage = () => {
  try {
    const stored = localStorage.getItem('tinderMatches');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};

const saveMatchesToStorage = (matches) => {
  localStorage.setItem('tinderMatches', JSON.stringify(matches));
};

// --- DUMMY DATA FOR REQUESTS ---
const DUMMY_REQUESTS = [
  {
    _id: "req_1",
    senderId: "user_a",
    sender: {
      firstName: "Aarushi",
      lastName: "Verma",
      photoUrl: "https://i.pinimg.com/736x/77/fa/b3/77fab32d3e7669186d8bf04226062a0f.jpg",
      age: 28,
      about: "Seeking an ambitious partner for a double date. Loves photography and late-night talks.",
      gender: "female",
    },
  },
  {
    _id: "req_2",
    senderId: "user_b",
    sender: {
      firstName: "Leena",
      lastName: "Gupta",
      photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      age: 33,
      about: "Just moved to the city. Let's grab coffee! I'm a UX designer.",
      gender: "female",
    },
  },
  {
    _id: "req_3",
    senderId: "user_c",
    sender: {
      firstName: "Kiran",
      lastName: "Rao",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      age: 24,
      about: "Into hiking and outdoor activities. Adventure awaits! I teach elementary school.",
      gender: "female",
    },
  },
  {
    _id: "req_4",
    senderId: "user_d",
    sender: {
      firstName: "Priya",
      lastName: "Singh",
      photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      age: 26,
      about: "Love cooking and trying new recipes. Looking for someone who enjoys good food!",
      gender: "female",
    },
  },
  {
    _id: "req_5",
    senderId: "user_e",
    sender: {
      firstName: "Neha",
      lastName: "Sharma",
      photoUrl: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      age: 29,
      about: "Fitness enthusiast and yoga instructor. Let's explore the city together!",
      gender: "female",
    },
  },
  {
    _id: "req_6",
    senderId: "user_f",
    sender: {
      firstName: "Ananya",
      lastName: "Mehta",
      photoUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      age: 25,
      about: "Software engineer who loves weekend getaways. Looking for someone to explore new places with!",
      gender: "female",
    },
  },
  {
    _id: "req_7",
    senderId: "user_g",
    sender: {
      firstName: "Ritika",
      lastName: "Kapoor",
      photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      age: 31,
      about: "Art enthusiast and museum lover. Let's discover the city's cultural side together!",
      gender: "female",
    },
  },
  {
    _id: "req_8",
    senderId: "user_h",
    sender: {
      firstName: "Kavya",
      lastName: "Reddy",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      age: 27,
      about: "Entrepreneur and book lover. Seeking meaningful conversations over coffee!",
      gender: "female",
    },
  },
];

const Requests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allRequests, setAllRequests] = useState([]);
  const [displayRequests, setDisplayRequests] = useState([]);
  const [matches, setMatches] = useState(getMatchesFromStorage());

  const getDisplayRequests = (requests) => {
    return requests.slice(0, 3);
  };

  const handleAccept = (request) => {
    console.log("ACCEPT BUTTON CLICKED!");
    console.log("Accepted request for:", request.sender.firstName, request.sender.lastName);
    
    try {
      // Add to matches
      const updatedMatches = [...matches, request];
      setMatches(updatedMatches);
      saveMatchesToStorage(updatedMatches);
      
      // Remove from requests
      setAllRequests(prev => {
        const updatedAll = prev.filter(req => req._id !== request._id);
        const newDisplay = getDisplayRequests(updatedAll);
        setDisplayRequests(newDisplay);
        return updatedAll;
      });
      
      // Update Redux
      try {
        dispatch(removeRequest(request._id));
      } catch (reduxError) {
        console.log("Redux update failed:", reduxError);
      }
      
      // Show success and navigate
      alert(`✅ You matched with ${request.sender.firstName}! Redirecting to matches...`);
      setTimeout(() => {
        navigate('/matches');
      }, 1500);
      
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Failed to accept request. Please try again.");
    }
  };

  const handleReject = (request) => {
    console.log("REJECT BUTTON CLICKED!");
    console.log("Rejected request for:", request.sender.firstName, request.sender.lastName);
    
    try {
      // Remove from requests
      setAllRequests(prev => {
        const updatedAll = prev.filter(req => req._id !== request._id);
        const newDisplay = getDisplayRequests(updatedAll);
        setDisplayRequests(newDisplay);
        return updatedAll;
      });
      
      // Update Redux
      try {
        dispatch(removeRequest(request._id));
      } catch (reduxError) {
        console.log("Redux update failed:", reduxError);
      }
      
      alert(`❌ You rejected ${request.sender.firstName}'s request.`);
      
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject request. Please try again.");
    }
  };

  const fetchRequests = async () => {
    console.log("Starting fetchRequests...");
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      if (res.data.data && res.data.data.length > 0) {
        setAllRequests(res.data.data);
        setDisplayRequests(getDisplayRequests(res.data.data));
        dispatch(addRequest(res.data.data));
      } else {
        setAllRequests(DUMMY_REQUESTS);
        setDisplayRequests(getDisplayRequests(DUMMY_REQUESTS));
        dispatch(addRequest(DUMMY_REQUESTS));
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      setAllRequests(DUMMY_REQUESTS);
      setDisplayRequests(getDisplayRequests(DUMMY_REQUESTS));
      dispatch(addRequest(DUMMY_REQUESTS));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-blue-600"></div>
          <h1 className="text-xl font-medium text-blue-700 mt-4">
            Requests Load Ho Rahe Hain...
          </h1>
        </div>
      </div>
    );
  }

  if (!displayRequests || displayRequests.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-xl font-medium text-gray-500 mb-4">
            Aapko Abhi Koi Request Nahi Aayi Hai.
          </h1>
          <button
            onClick={() => {
              setLoading(true);
              fetchRequests();
            }}
            className="btn btn-outline btn-primary"
          >
            Refresh
          </button>
          
          <button
            onClick={() => {
              setAllRequests(DUMMY_REQUESTS);
              setDisplayRequests(getDisplayRequests(DUMMY_REQUESTS));
            }}
            className="btn btn-warning mt-4 block mx-auto"
          >
            Load More Requests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-600">
        Your Pending Requests ({displayRequests.length})
      </h1>

      {matches.length > 0 && (
        <div className="text-center mb-6 p-3 bg-green-100 rounded">
          <p className="text-green-700 font-medium">
            You have {matches.length} matches! 
            ({matches.map(m => m.sender.firstName).join(", ")})
          </p>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {displayRequests.map((request) => {
          const { firstName, lastName, photoUrl, age, gender, about } = request.sender;

          return (
            <div
              key={request._id}
              className="w-full sm:w-80 bg-white shadow-xl rounded-xl overflow-hidden transform hover:scale-[1.02] transition duration-300 border-2 border-blue-100"
            >
              <figure className="relative h-72">
                <img
                  src={photoUrl}
                  alt={`${firstName}'s Profile`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${firstName}+${lastName || ""}&size=400&background=6366f1&color=ffffff&bold=true`;
                  }}
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent w-full p-4">
                  <p className="text-white text-xl font-semibold">
                    {firstName} {lastName && lastName}, {age}
                  </p>
                  <p className="text-white text-sm opacity-90 capitalize">{gender}</p>
                </div>
              </figure>

              <div className="p-4">
                <p className="text-gray-700 text-sm italic mb-4">
                  <strong>Message:</strong> "{about}"
                </p>

                <div className="flex justify-around gap-2">
                  <button 
                    onClick={() => handleReject(request)}
                    className="btn btn-error btn-sm flex-1 rounded-full text-white shadow-lg bg-red-500 hover:bg-red-600 border-red-500 transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </button>

                  <button 
                    onClick={() => handleAccept(request)}
                    className="btn btn-success btn-sm flex-1 rounded-full text-white shadow-lg bg-green-500 hover:bg-green-600 border-green-500 transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;