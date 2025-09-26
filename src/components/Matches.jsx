import React, { useState, useEffect } from "react";

// Get matches from localStorage
const getMatchesFromStorage = () => {
  try {
    const stored = localStorage.getItem('tinderMatches');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};

const Matches = () => {
  const [matches, setMatches] = useState(getMatchesFromStorage());

  // Update matches when component mounts or localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setMatches(getMatchesFromStorage());
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also update on focus (when coming back from another tab/page)
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  // Refresh matches manually
  const refreshMatches = () => {
    setMatches(getMatchesFromStorage());
  };

  if (matches.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-center mb-10 text-pink-600">
            Your Matches
          </h1>
          <div className="max-w-md mx-auto">
            <div className="p-8 bg-gray-50 rounded-lg">
              <div className="text-6xl mb-4">💘</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No Matches Yet
              </h2>
              <p className="text-gray-600 mb-4">
                Start accepting requests to see your matches here!
              </p>
              <button 
                onClick={refreshMatches}
                className="btn btn-primary"
              >
                Refresh Matches
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-pink-600">
          Your Matches ({matches.length})
        </h1>
        <button 
          onClick={refreshMatches}
          className="btn btn-outline btn-primary btn-sm"
        >
          Refresh
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {matches.map((match) => {
          const { firstName, lastName, photoUrl, age, gender, about } = match.sender;

          return (
            <div
              key={match._id}
              className="w-full sm:w-80 bg-white shadow-xl rounded-xl overflow-hidden transform hover:scale-[1.02] transition duration-300 border-2 border-pink-200"
            >
              <figure className="relative h-72">
                <img
                  src={photoUrl}
                  alt={`${firstName}'s Profile`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${firstName}+${lastName || ""}&size=400&background=ec4899&color=ffffff&bold=true`;
                  }}
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent w-full p-4">
                  <p className="text-white text-xl font-semibold">
                    {firstName} {lastName && lastName}, {age}
                  </p>
                  <p className="text-white text-sm opacity-90 capitalize">{gender}</p>
                </div>
                
                {/* Match indicator */}
                <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  ✨ MATCH
                </div>
              </figure>

              <div className="p-4">
                <p className="text-gray-700 text-sm italic mb-4">
                  <strong>About:</strong> "{about}"
                </p>

                <div className="flex justify-center gap-2">
                  <button className="btn btn-primary btn-sm flex-1 rounded-full shadow-lg bg-pink-500 hover:bg-pink-600 border-pink-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Message
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Debug info for development */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Matches are automatically updated when you accept requests</p>
      </div>
    </div>
  );
};

export default Matches;