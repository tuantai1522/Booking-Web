import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";

import { useNavigate } from "react-router-dom";

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isUpdating, mutateAsync: updateBooking } = useMutation({
    mutationFn: updateBookingApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        active: true,
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, updateBooking };
};
