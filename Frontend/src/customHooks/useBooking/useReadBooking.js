import { useQuery } from "@tanstack/react-query";

import { fetchAllBooking } from "../../services/apiBookings";

import { useSearchParams } from "react-router-dom";
import {
  DEFAULT_FILTER_BOOKING_NAME,
  DEFAULT_SORT_BOOKING_NAME,
  DEFAULT_CUR_PAGE,
} from "../../utils/config";

export const useReadBooking = () => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("filter") || DEFAULT_FILTER_BOOKING_NAME;
  const sortValue = searchParams.get("sort") || DEFAULT_SORT_BOOKING_NAME;
  const pageValue = searchParams.get("curPage") || DEFAULT_CUR_PAGE;

  const {
    isLoading: isFetching,
    data,
    error,
  } = useQuery({
    //Nếu các queryKey thay đổi, sẽ fetch lại data
    queryKey: ["bookings", filterValue, sortValue, pageValue],
    queryFn: () => fetchAllBooking(filterValue, sortValue, pageValue),
  });

  return { isFetching, data, error };
};
