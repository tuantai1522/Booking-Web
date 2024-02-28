import { useQuery } from "@tanstack/react-query";

import { fetchBookingById } from "../../services/apiBookings";

import { useParams } from "react-router-dom";

export const useReadBookingById = () => {
  const { id } = useParams();

  const {
    isLoading: isFetching,
    data: booking,
    error,
  } = useQuery({
    //Nếu các queryKey thay đổi, sẽ fetch lại data
    queryKey: ["booking", id],
    queryFn: () => fetchBookingById(id),
  });

  return { isFetching, booking, error };
};
