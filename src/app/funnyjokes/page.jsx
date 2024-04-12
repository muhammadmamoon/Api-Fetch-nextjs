
"use client"

import { useState } from 'react';

const Page = () => {
  const [joke, setJoke] = useState('');

  const fetchJoke = async () => {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,explicit&type=single');
      const data = await response.json();
      setJoke(data.joke);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  const handleNextJoke = () => {
    fetchJoke();
  };

  return (
    <div>
      <h1>Random Joke</h1>
      {joke && <p>{joke}</p>}
      <button onClick={handleNextJoke}>Next Joke</button>
    </div>
  );
};

export default Page;
