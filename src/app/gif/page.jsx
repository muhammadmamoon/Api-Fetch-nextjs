"use client"
import { useState } from 'react';
import axios from 'axios';

const GifSearchApp = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [gifs, setGifs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your Giphy API key

    const handleSearch = async () => {
        if (!searchTerm) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
                    searchTerm
                )}&limit=10&offset=0&rating=g&lang=en`
            );

            const data = response.data;

            if (data && data.data) {
                setGifs(data.data);
            } else {
                setError('No GIFs found');
            }
        } catch (err) {
            setError('Error fetching GIFs');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-3/4 max-w-xl">
                <h1 className="text-2xl font-bold mb-4">GIF Search App</h1>
                <div className="flex mb-4">
                    <input
                        type="text"
                        className="w-full border rounded-lg p-2"
                        placeholder="Search for GIFs"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-lg font-bold"
                    >
                        Search
                    </button>
                </div>
                {loading && <p className="text-gray-600">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {gifs.map((gif) => (
                        <div key={gif.id} className="flex justify-center items-center">
                            <img src={gif.images.original.url} alt={gif.title} className="w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GifSearchApp;
