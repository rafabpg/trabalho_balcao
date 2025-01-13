import axios from "axios";

const api = axios.create({
  baseURL: "https://dynamic-herring-cosmic.ngrok-free.app/api/v1",
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

export default api;