"use client"
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');


  const handleGetFact = async () => {
  
    if (number < 0 || number > 300) {
      setError('Please enter a number between 0 and 300.');
      setResult('');
    } else {
      try {
        const response = await axios.get(`https://numbersapi.com/${number}`);
        setResult(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error(err);
      }
    }
  };

 
  const handleGetRandomFact = async () => {
    const randomNumber = Math.floor(Math.random() * 301);
    try {
      const response = await axios.get(`https://numbersapi.com/${randomNumber}`);
      setResult(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-4">
        <input
          type="number"
          className="border rounded px-3 py-1 mr-4"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter a number (0-300)"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleGetFact}
        >
          Get Fact
        </button>
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleGetRandomFact}
      >
        Get Random Fact
      </button>
     
      {error && <div className="text-red-500 mb-4">{error}</div>}
    
      {result && <div className="text-gray-800">{result}</div>}
    </div>
  );
}
