"use client"
import { useState } from 'react';
import { fetchMarvelCharacters } from './marvalapi';
import Image from 'next/image';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const handleSearch = async () => {
        const results = await fetchMarvelCharacters(searchTerm);
        setSearchResults(results);
    };

    const handleCharacterSelect = (character) => {
        setSelectedCharacter(character);
        setSearchResults([]);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        placeholder="Search Marvel character"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>

                {searchResults.length > 0 && (
                    <div className="bg-gray-200 p-2 rounded shadow-lg">
                        {searchResults.map((character) => (
                            <div
                                key={character.id}
                                onClick={() => handleCharacterSelect(character)}
                                className="p-2 hover:bg-gray-300 cursor-pointer"
                            >
                                <p>{character.name}</p>
                            </div>
                        ))}
                    </div>
                )}

                {selectedCharacter && (
                    <div className="mt-4">
                        <div className="flex justify-center">
                            <Image
                                src={`${selectedCharacter.thumbnail.path}/standard_fantastic.${selectedCharacter.thumbnail.extension}`}
                                alt={selectedCharacter.name}
                                width={150}
                                height={150}
                                className="rounded-full"
                            />
                        </div>
                        <p className="text-center font-semibold">{selectedCharacter.name}</p>
                        <p className="text-center text-sm mt-2">{selectedCharacter.description || 'No description available.'}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
