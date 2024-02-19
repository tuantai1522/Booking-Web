import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addRoom as addRoomApi } from "../../services/apiRooms";

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutateAsync: addRoom } = useMutation({
    mutationFn: addRoomApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: "rooms",
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isAdding, addRoom };
};
