import axios from "axios";

import {
  NODE_URL,
  DEFAULT_FILTER_ROOM_NAME,
  DEFAULT_SORT_ROOM_NAME,
} from "../utils/config";

const fetchAllRoom = async (
  filter = DEFAULT_FILTER_ROOM_NAME,
  sort = DEFAULT_SORT_ROOM_NAME
) => {
  try {
    const response = await axios.get(
      `${NODE_URL}/api/rooms/read?filter=${filter}&sort=${sort}`
    );
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
