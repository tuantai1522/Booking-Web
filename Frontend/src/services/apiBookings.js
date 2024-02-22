import axios from "axios";
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

    return response.data.DT;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export { fetchAllBooking };
