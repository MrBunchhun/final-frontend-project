import axios from "axios";

const API = axios.create({
  baseURL: "https://final-information-production.up.railway.app",
  withCredentials: true, // needed for Sanctum cookie auth
});

// NO interceptor adding Authorization header for Sanctum

export default API;

export const getCsrfCookie = () => {
  return API.get("/sanctum/csrf-cookie");
};

export const register = async (data) => {
  await getCsrfCookie();  // first get CSRF cookie
  return API.post("/auth/register", data);
};

export const login = async (credentials) => {
  await getCsrfCookie();  // first get CSRF cookie
  return API.post("/auth/login", credentials);
};

export const fetchUser = async () => {
  return API.get("/auth/user");
};
