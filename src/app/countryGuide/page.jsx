"use client"
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setError(''); 
        setResult(null); 

        if (query.trim() === '') return;

        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${query}?fullText=true`);
            const data = await response.json();

            if (response.ok && data.length > 0) {
                setResult(data[0]);
            } else {
                setError("It's not a country.");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('An error occurred while fetching data.');
        }
    };

    return (
        <div className="p-4">
            <Head>
                <title>Country Guide</title>
            </Head>
            <div className="container mx-auto text-center">
                <h1 className="text-2xl font-bold mb-4">Country Guide</h1>
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="border border-gray-300 p-2 w-64 rounded-l"
                        placeholder="Enter a country name"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white p-2 rounded-r"
                    >
                        Search
                    </button>
                </div>
                {error && (
                    <div className="text-red-500 mb-4">{error}</div>
                )}
                {result && (
                    <div className="result text-left mx-auto w-96">
                        <h2 className="text-xl font-semibold mb-2">{result.name.common}</h2>
                        <img src={result.flags.png} alt={`${result.name.common} flag`} className="mb-4" />
                        <p><strong>Capital:</strong> {result.capital}</p>
                        <p><strong>Continent:</strong> {result.continents}</p>
                        <p><strong>Population:</strong> {result.population.toLocaleString()}</p>
                        <p><strong>Currency:</strong> {Object.values(result.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</p>
                        <p><strong>Language:</strong> {Object.values(result.languages).join(', ')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
