"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const API_KEY = 'YOUR_API_KEY_HERE'; // Add your API key here
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(0);
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState(null);

    useEffect(() => {
        // Fetch currency data
        const fetchCurrencies = async () => {
            const response = await axios.get(API_URL);
            const data = response.data;

            if (data && data.rates) {
                const currencyList = Object.keys(data.rates);
                setCurrencies(currencyList);
            }
        };
        
        fetchCurrencies();
    }, []);

    const handleConvert = async () => {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`);
        const data = response.data;
        const rate = data.rates[toCurrency];
        const result = amount * rate;
        setConvertedAmount(result.toFixed(2));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center mb-4">
                    <Image src="/currency-icon.png" alt="Currency Icon" width={50} height={50} />
                    <h1 className="text-2xl font-bold mb-2">Convert Currency</h1>
                    <div className="mb-4">
                        <label className="block text-left">Amount:</label>
                        <input
                            type="number"
                            className="w-full border rounded-lg p-2"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className="flex justify-between mb-4">
                    <div className="w-1/2">
                        <label className="block">From:</label>
                        <div className="relative">
                            <select
                                className="w-full border rounded-lg p-2"
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                            >
                                {currencies.map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currency}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <label className="block">To:</label>
                        <div className="relative">
                            <select
                                className="w-full border rounded-lg p-2"
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                            >
                                {currencies.map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currency}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleConvert}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold"
                >
                    Convert
                </button>
                {convertedAmount !== null && (
                    <div className="mt-4 text-center">
                        <h2 className="text-xl font-bold">Converted Amount:</h2>
                        <p>{convertedAmount} {toCurrency}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrencyConverter;
