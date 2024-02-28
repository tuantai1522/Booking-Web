import axios from "../setup/axios";

import { NODE_URL } from "../utils/config";

const logIn = async (data) => {
  try {
    const response = await axios.post(`${NODE_URL}/api/login`, data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export { logIn };
