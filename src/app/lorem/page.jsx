"use client"
import { useState } from 'react';
import axios from 'axios';

const LoremIpsumGenerator = () => {
    const [numParagraphs, setNumParagraphs] = useState('');
    const [loremIpsumText, setLoremIpsumText] = useState('');
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        try {
            const response = await axios.get(`https://api.api-ninjas.com/v1/loremipsum?paragraphs=${numParagraphs}`, {
                headers: {
                    'X-Api-Key': 'YOUR_API_KEY_HERE' 
                }
            });
            const data = response.data;

            if (data && data.text) {
                setLoremIpsumText(data.text);
                setError(null);
            } else {
                setError('Failed to generate Lorem Ipsum text.');
            }
        } catch (err) {
            setError('Failed to generate Lorem Ipsum text.');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(loremIpsumText)
            .then(() => {
                alert('Lorem Ipsum text copied to clipboard!');
            })
            .catch((err) => {
                alert('Failed to copy text. Please try again.');
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold mb-4">Lorem Ipsum Generator App</h1>
                <div className="mb-4">
                    <input
                        type="number"
                        className="w-full border rounded-lg p-2"
                        placeholder="Enter number of paragraphs"
                        value={numParagraphs}
                        onChange={(e) => setNumParagraphs(e.target.value)}
                    />
                </div>
                <div className="flex justify-between mb-4">
                    <button
                        onClick={handleGenerate}
                        className="w-1/2 mr-2 bg-blue-600 text-white py-2 rounded-lg font-bold"
                    >
                        Generate
                    </button>
                    <button
                        onClick={handleCopy}
                        className="w-1/2 ml-2 bg-green-600 text-white py-2 rounded-lg font-bold"
                    >
                        Copy
                    </button>
                </div>
                {loremIpsumText && (
                    <div className="mt-4 text-left">
                        <textarea
                            readOnly
                            className="w-full h-40 border rounded-lg p-2"
                            value={loremIpsumText}
                        />
                    </div>
                )}
                {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default LoremIpsumGenerator;
