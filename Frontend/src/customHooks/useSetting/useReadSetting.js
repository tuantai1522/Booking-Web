import { useQuery } from "@tanstack/react-query";
import { fetchSetting } from "../../services/apiSettings";

export const useReadSetting = () => {
  const {
    isLoading: isFetching,
    data: setting,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSetting,
  });

  return { isFetching, setting, error };
};
