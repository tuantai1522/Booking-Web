import axios from "axios";
import { NODE_URL } from "../utils/config";

const fetchAllRoom = async () => {
  try {
    const response = await axios.get(`${NODE_URL}/api/rooms/read`);
    return response.data.DT;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

const deleteRoom = async (roomId) => {
  try {
    const response = await axios.delete(
      `${NODE_URL}/api/rooms/delete?roomId=${roomId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
};

const addRoom = async (data) => {
  try {
    const response = await axios.post(`${NODE_URL}/api/rooms/create`, data);
    return response.data;
  } catch (error) {
    console.error("Error addring room:", error);
    throw error;
  }
};

const updateRoom = async (data) => {
  try {
    const response = await axios.put(`${NODE_URL}/api/rooms/update`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
};
export { fetchAllRoom, deleteRoom, addRoom, updateRoom };
