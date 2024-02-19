import { useQuery } from "@tanstack/react-query";
import { fetchAllRoom } from "../../services/apiRooms";

export const useReadRoom = () => {
  const {
    isLoading: isFetching,
    data: rooms,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: fetchAllRoom,
  });

  return { isFetching, rooms, error };
};
