"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

const RandomUserCard = () => {
  const [user, setUser] = useState(null);

  const fetchRandomUser = async () => {
    try {
      const response = await axios.get(
        "https://random-data-api.com/api/v2/users?response_type=json"
      );
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchRandomUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <div className="mb-4">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto"
          />
        </div>
        <h3 className="text-xl font-bold mb-2">{user.first_name} {user.last_name}</h3>
        <p className="text-gray-600 mb-2">{user.employment.title}</p>
        <div className="flex items-center justify-center text-gray-600 mb-4">
          <svg
            className="w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 0a9 9 0 100 18A9 9 0 009 0zm0 2a7 7 0 100 14A7 7 0 009 2zm0 3a2 2 0 110 4 2 2 0 010-4zm0 9.078a5.907 5.907 0 01-4.09-1.547c.03-.631.19-1.286.478-1.914.49-1.063 1.188-2.2 1.94-3.063a3.588 3.588 0 014.324 0c.752.863 1.45 2 1.94 3.063.288.628.448 1.283.478 1.914A5.907 5.907 0 019 14.078z"
              clipRule="evenodd"
            />
          </svg>
          <p>{user.address.city}, {user.address.country}</p>
        </div>
        <button
          onClick={fetchRandomUser}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Get Random User
        </button>
      </div>
    </div>
  );
};

export default RandomUserCard;
