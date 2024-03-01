import axios from "../setup/axios";
import {
  NODE_URL,
  DEFAULT_FILTER_BOOKING_NAME,
  DEFAULT_SORT_BOOKING_NAME,
  DEFAULT_CUR_PAGE,
} from "../utils/config";

const fetchAllBooking = async (
  filter = DEFAULT_FILTER_BOOKING_NAME,
  sort = DEFAULT_SORT_BOOKING_NAME,
  curPage = DEFAULT_CUR_PAGE
) => {
  try {
    const response = await axios.get(
      `${NODE_URL}/api/bookings/read?filter=${filter}&sort=${sort}&curPage=${curPage}`
    );

    return response.DT;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

const fetchBookingById = async (id) => {
  try {
    const response = await axios.get(`${NODE_URL}/api/bookings/read/${id}`);

    return response.DT;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

const updateBooking = async (data) => {
  try {
    const response = await axios.put(`${NODE_URL}/api/bookings/update`, data);
    return response;
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
};

const addBooking = async (data) => {
  try {
    const response = await axios.post(`${NODE_URL}/api/bookings/create`, data);

    return response;
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
};
export { fetchAllBooking, fetchBookingById, updateBooking, addBooking };
