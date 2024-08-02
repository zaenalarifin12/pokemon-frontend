const axios = require('axios');

// Create a reusable Axios instance with a base URL
const apiClient = axios.create({
    baseURL: 'http://localhost:3005',
    timeout: 1000, // Optional: set a timeout for requests
    headers: { 'Content-Type': 'application/json' } // Optional: set default headers
});

export default apiClient