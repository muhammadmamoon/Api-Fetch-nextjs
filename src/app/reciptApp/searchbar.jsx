
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchClick = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="flex items-center my-5">
            <input
                type="text"
                placeholder="Enter dish name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-l-lg px-4 py-2 w-80 focus:outline-none"
            />
            <button
                onClick={handleSearchClick}
                className="bg-yellow-400 hover:bg-yellow-500 rounded-r-lg px-4 py-2"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
