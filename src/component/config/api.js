// config/api.js
import axios from "axios";

// export const API_URL = "http://localhost:8080"
const API_URL = process.env.NODE_ENV === 'production' 
  ? "https://quickbite-backend-58ik.onrender.com"  // Replace this with your actual deployed backend URL
  : "http://localhost:8080";  // Local development backend URL

export const api=axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  }
})
