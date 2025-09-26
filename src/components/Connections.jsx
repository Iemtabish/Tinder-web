import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

// --- DUMMY DATA FOR DEMO ---
// Yeh data tab use hoga jab API se koi connection nahi milega.
const DUMMY_CONNECTIONS = [
  {
    _id: "id_1",
    firstName: "Giorgia", // Name updated
    lastName: "Meloni",
    // NEW URL for Meloni
    photoUrl: "https://www.hungarianconservative.com/wp-content/uploads/2022/10/K_EPA20221023026-scaled.jpg", 
    age: 46,
    gender: "female",
    about: "Passionate about policy and governance. Looking for an insightful partner.",
  },
  {
    _id: "id_2",
    firstName: "Samba", // Name updated
    lastName: "Diallo",
    // NEW URL for Samba
    photoUrl: "https://famefoundationwg.org/wp-content/uploads/2021/04/samba.jpg",
    age: 32,
    gender: "female",
    about: "Dedicated to community work and growth. Seeking a connection built on shared values.",
  },
  {
    _id: "id_3",
    firstName: "Donald", // Name updated
    lastName: "Trump",
    // NEW URL for Trump
    photoUrl: "https://i.natgeofe.com/k/5e4ea67e-2219-4de4-9240-2992faef0cb6/trump-portrait.jpg?wp=1&w=1084.125&h=1068.375",
    age: 78,
    gender: "male",
    about: "Businessman and golf enthusiast. Let's make connections great again!",
  },
];
// ----------------------------

const Connections = () => {
  // Store se connections data nikal rahe hain
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      
      // Check karte hain ki API se actual data aaya hai ya nahi
      if (res.data.data && res.data.data.length > 0) {
        dispatch(addConnection(res.data.data));
      } else {
        // Agar data nahi mila, toh UI demo ke liye dummy data dispatch karte hain
        dispatch(addConnection(DUMMY_CONNECTIONS));
      }
      
    } catch (error) {
      console.error("Connections fetch karne mein error:", error);
      // Network error hone par bhi dummy data dikhao
      dispatch(addConnection(DUMMY_CONNECTIONS));
    } finally {
      setLoading(false);
    }
  };

  // [] dependency array ke saath useEffect sirf ek baar chalta hai.
  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) return <h1 className="text-center my-10 text-xl font-medium text-gray-700">Connections Load Ho Rahe Hain...</h1>;

  // Conditional Rendering
  if (!connections || connections.length === 0)
    return <h1 className="text-center my-10 text-xl font-medium text-red-500">Koi Connections Nahi Mile (Dummy Data bhi nahi mila)</h1>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">Aapke Matches</h1>
      
      <div className="flex flex-wrap justify-center gap-6">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div 
              key={_id || firstName + lastName} 
              className="w-full sm:w-80 bg-white shadow-2xl rounded-xl overflow-hidden transform hover:scale-[1.02] transition duration-300 border-2 border-pink-100"
            >
              <figure className="relative h-72">
                {/* Photo yahaan render hogi */}
                <img 
                  src={photoUrl} 
                  alt={`${firstName}'s Profile`} 
                  className="w-full h-full object-cover"
                  onError={(e) => { 
                    e.target.onerror = null; // Infinite loop se bachne ke liye
                    e.target.src = "https://via.placeholder.com/400x300?text=Photo+Available+Nahi";
                  }}
                />
                {/* Age aur Gender ki jankari image ke upar */}
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent w-full p-4">
                  <p className="text-white text-xl font-semibold">
                    {firstName}, {age} ({gender})
                  </p>
                </div>
              </figure>

              <div className="p-4">
                <p className="text-gray-600 text-sm italic">{about}</p>
                
                <div className="flex justify-around mt-4">
                  <button className="btn btn-error btn-sm w-5/12 rounded-full text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Pass
                  </button>
                  <button className="btn btn-success btn-sm w-5/12 rounded-full text-white shadow-lg bg-pink-500 hover:bg-pink-600 border-pink-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Like
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

export default Connections;
