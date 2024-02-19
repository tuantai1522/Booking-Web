import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom as deleteRoomApi } from "../../services/apiRooms";
import { toast } from "react-toastify";

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutateAsync: deleteRoom } = useMutation({
    mutationFn: deleteRoomApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: "rooms",
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteRoom };
};
