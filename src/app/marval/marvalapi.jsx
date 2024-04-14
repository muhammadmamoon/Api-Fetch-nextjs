import axios from 'axios';
import md5 from 'md5';

const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_PRIVATE_KEY;

export async function fetchMarvelCharacters(searchTerm) {
    
    const timestamp = new Date().getTime().toString();
    const hash = md5(`${timestamp}${privateKey}${publicKey}`);

    const baseURL = 'https://gateway.marvel.com/v1/public/characters';
    const params = {
        apikey: publicKey,
        hash,
        ts: timestamp,
        nameStartsWith: searchTerm,
        limit: 10,
    };

    try {
        const response = await axios.get(baseURL, { params });
        return response.data.data.results;
    } catch (error) {
        console.error('Failed to fetch Marvel characters:', error);
        if (error.response) {
            console.error('Status Code:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
       
        return [];
    }
}
