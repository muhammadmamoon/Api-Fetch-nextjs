"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

const MemesCard = () => {
  const [meme, setMeme] = useState(null);

  const fetchRandomMeme = async () => {
    try {
      const response = await axios.get("https://meme-api.com/gimme");
      setMeme(response.data);
    } catch (error) {
      console.error("Failed to fetch meme data:", error);
    }
  };

  useEffect(() => {
    fetchRandomMeme();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        {meme && (
          <div>
            <img
              src={meme.url}
              alt={meme.title}
              className="rounded-lg w-full h-64 object-cover mb-4"
            />
            <p className="text-lg font-semibold mb-4">{meme.title}</p>
          </div>
        )}
        <button
          onClick={fetchRandomMeme}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Get Memes
        </button>
      </div>
    </div>
  );
};

export default MemesCard;
