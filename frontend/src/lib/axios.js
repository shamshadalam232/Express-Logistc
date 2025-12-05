import axios from "axios";

export const api = axios.create({
  baseURL:  import.meta.env.MODE === "devlopment" ? "http://localhost:5000/api" : "/api",
  withCredentials: true,
});
