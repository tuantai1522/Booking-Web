import { useQuery } from "@tanstack/react-query";
import { fetchAllRoom } from "../../services/apiRooms";
import { useSearchParams } from "react-router-dom";
import {
  DEFAULT_FILTER_ROOM_NAME,
  DEFAULT_SORT_ROOM_NAME,
} from "../../utils/config";

export const useReadRoom = () => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("filter") || DEFAULT_FILTER_ROOM_NAME;
  const sortValue = searchParams.get("sort") || DEFAULT_SORT_ROOM_NAME;

  const {
    isLoading: isFetching,
    data: rooms,
    error,
  } = useQuery({
    //Nếu các queryKey thay đổi, sẽ fetch lại data
    queryKey: ["rooms", filterValue, sortValue],
    queryFn: () => fetchAllRoom(filterValue, sortValue),
  });

  return { isFetching, rooms, error };
};
