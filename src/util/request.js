import axios from "axios";
import config from "./config";

export const request = async (
  endpoint,
  method = "get",
  data = null,
  headers = {}
) => {
  const url = `${config.BASE_URL}${endpoint}`;
  const token = localStorage.getItem("token");

  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);

    const errData = error.response?.data;

    throw {
      message: errData?.message || "Something went wrong",
      errors: errData?.errors || null,
    };
  }
};
