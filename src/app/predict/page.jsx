"use client"
import { useState } from 'react';
import axios from 'axios';

const PredictGender = () => {
    const [name, setName] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handlePredict = async () => {
        try {
            const response = await axios.get(`https://api.genderize.io?name=${name}`);
            const data = response.data;

            if (data && data.name) {
                setPrediction({
                    name: data.name,
                    gender: data.gender,
                    probability: data.probability,
                });
                setError(null);
            } else {
                setError('Name not found');
                setPrediction(null);
            }
        } catch (err) {
            setError('Error predicting gender');
            setPrediction(null);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold mb-4">Predict Gender by Name</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full border rounded-lg p-2"
                        placeholder="Enter a name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button
                    onClick={handlePredict}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold"
                >
                    Predict
                </button>
                {prediction && (
                    <div className="mt-4">
                        <h2 className="text-xl font-bold">{prediction.name}</h2>
                        <p>
                            <span className="font-bold">Gender: </span>
                            {prediction.gender === 'male' ? '♂️ Male' : '♀️ Female'}
                        </p>
                        <p>
                            <span className="font-bold">Probability: </span>
                            {prediction.probability}
                        </p>
                    </div>
                )}
                {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default PredictGender;
