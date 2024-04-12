"use client"
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const [audioUrl, setAudioUrl] = useState('');

    const handleSearch = async () => {
        if (query.trim() === '') return;

        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
        const data = await response.json();

        if (response.ok) {
            setResult(data[0]);
            const audioFile = data[0].phonetics.find(phonetic => phonetic.audio);
            if (audioFile) {
                setAudioUrl(audioFile.audio);
            } else {
                setAudioUrl('');
            }
        } else {
            setResult(null);
            setAudioUrl('');
        }
    };

    const handleTextToSpeech = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        } else {
            alert('Audio not available for this word');
        }
    };

    return (
        <div className="p-4">
            <Head>
                <title>Dictionary App</title>
            </Head>
            <div className="container mx-auto text-center">
                <h1 className="text-2xl font-bold mb-4">Dictionary App</h1>
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="border border-gray-300 p-2 w-64 rounded-l"
                        placeholder="Enter a word"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white p-2 rounded-r"
                    >
                        Search
                    </button>
                </div>
                {result && (
                    <div className="result text-left mx-auto w-96">
                        <h2 className="text-xl font-semibold mb-2">{result.word}</h2>
                        {result.meanings.map((meaning, index) => (
                            <div key={index} className="mb-2">
                                <h3 className="font-semibold">{meaning.partOfSpeech}</h3>
                                <ul>
                                    {meaning.definitions.map((def, i) => (
                                        <li key={i} className="ml-4">
                                            {def.definition}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        {audioUrl && (
                            <button
                                className="mt-4 bg-green-500 text-white p-2 rounded"
                                onClick={handleTextToSpeech}
                            >
                                🔊 Listen
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
