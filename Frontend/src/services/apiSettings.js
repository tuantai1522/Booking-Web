import axios from "../setup/axios";

import { NODE_URL } from "../utils/config";

const fetchSetting = async () => {
  try {
    const response = await axios.get(`${NODE_URL}/api/settings/read`);
    return response.DT;
  } catch (error) {
    console.error("Error fetching setting:", error);
    throw error;
  }
};

const updateSetting = async (data) => {
  try {
    const response = await axios.put(`${NODE_URL}/api/settings/update`, data);

    return response;
  } catch (error) {
    console.error("Error updating setting:", error);
    throw error;
  }
};
export { fetchSetting, updateSetting };
