import axios from "axios";


const baseUrl = import.meta.env.VITE_BACKEND_URL;
// Create an Axios instance with custom configuration
export const publicRequest = axios.create({
  baseURL: baseUrl, // Replace with your API base URL

  headers: {
    "Content-Type": "application/json", // Set default headers
    // Add any other headers you need
  },
});

