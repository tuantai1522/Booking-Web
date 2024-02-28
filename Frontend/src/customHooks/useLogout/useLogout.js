import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut as logOutApi } from "../../services/apiLogout.js";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isLoading: isFetching, mutateAsync: logout } = useMutation({
    mutationFn: logOutApi,

    onSuccess: (data) => {
      navigate("/login");

      //clear data in react-query
      queryClient.removeQueries({ queryKey: "user" });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isFetching, logout };
};
