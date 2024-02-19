import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateRoom as updateRoomApi } from "../../services/apiRooms";

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutateAsync: updateRoom } = useMutation({
    mutationFn: updateRoomApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: "rooms",
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, updateRoom };
};
