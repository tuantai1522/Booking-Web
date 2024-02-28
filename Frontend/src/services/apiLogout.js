import axios from "../setup/axios";

import { NODE_URL } from "../utils/config";

const logOut = async () => {
  try {
    const response = await axios.post(`${NODE_URL}/api/logout`);
    return response;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export { logOut };
