const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const API_URL_BACKEND = process.env.NEXT_PUBLIC_API_URL_BACKEND || 'http://api/api';

export const config = {
    apiUrl: API_URL,
    apiUrlBackend: API_URL,
}