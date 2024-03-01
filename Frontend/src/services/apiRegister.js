import axios from "../setup/axios";

import { NODE_URL } from "../utils/config";

const register = async (data) => {
  try {
    const response = await axios.post(`${NODE_URL}/api/register`, data);
    return response;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export { register };
