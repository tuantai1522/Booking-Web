import { useQuery } from "@tanstack/react-query";
import { useLogin } from "../useLogin/useLogin";

export const useGuest = () => {
  const { data: user, isLoading, error } = useQuery("user");

  return { isLoading, user, error };
};
