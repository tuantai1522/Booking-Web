import { DEFAULT_FILTER_DASHBOARD_NAME, NODE_URL } from "../utils/config.js";
import axios from "../setup/axios";

const fetchBookingAfterDate = async (last = DEFAULT_FILTER_DASHBOARD_NAME) => {
  try {
    const response = await axios.get(
      `${NODE_URL}/api/dashboard/bookings-after-day?last=${last}`
    );

    return response;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

const fetchStayingAfterDate = async (last = DEFAULT_FILTER_DASHBOARD_NAME) => {
  try {
    const response = await axios.get(
      `${NODE_URL}/api/dashboard/statyings-after-day?last=${last}`
    );

    return response;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};
export { fetchBookingAfterDate, fetchStayingAfterDate };
