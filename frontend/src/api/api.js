import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-768992935856.us-central1.run.app/"
});

export default api;
