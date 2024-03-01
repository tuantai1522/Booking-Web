import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { DEFAULT_FILTER_DASHBOARD_NAME } from "../../utils/config";
import { fetchStayingAfterDate } from "../../services/apiDashboard";

export const useRecentStayings = () => {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get("last") || DEFAULT_FILTER_DASHBOARD_NAME;

  const {
    isLoading: isFetching,
    data: stayings,
    error,
  } = useQuery({
    //Nếu các queryKey thay đổi, sẽ fetch lại data
    queryKey: ["stayings", numDays],
    queryFn: () => fetchStayingAfterDate(numDays),
  });

  return { isFetching, stayings };
};
