import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { DEFAULT_FILTER_DASHBOARD_NAME } from "../../utils/config";
import { fetchBookingAfterDate } from "../../services/apiDashboard";

export const useRecentBookings = () => {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get("last") || DEFAULT_FILTER_DASHBOARD_NAME;

  const {
    isLoading: isFetching,
    data: bookings,
    error,
  } = useQuery({
    //Nếu các queryKey thay đổi, sẽ fetch lại data
    queryKey: ["bookings", numDays],
    queryFn: () => fetchBookingAfterDate(numDays),
  });

  return { isFetching, bookings, numDays };
};
