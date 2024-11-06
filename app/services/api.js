import axios from 'axios';

// Default instance
export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'rybka-space.vercel.app',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
});
