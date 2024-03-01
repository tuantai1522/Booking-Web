import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addBooking as addBookingApi } from "../../services/apiBookings";

export const useCreateBooking = () => {
  const { isLoading: isAdding, mutateAsync: addBooking } = useMutation({
    mutationFn: addBookingApi,

    onSuccess: (response) => {},

    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isAdding, addBooking };
};
