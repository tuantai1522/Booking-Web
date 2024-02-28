import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logIn as logInApi } from "../../services/apiLogin";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isLoading: isFetching, mutateAsync: login } = useMutation({
    mutationFn: logInApi,

    onSuccess: (data) => {
      //build data

      const retrivedData = data.DT;

      //setting user is current user after logging in
      queryClient.setQueriesData("user", retrivedData);

      queryClient.invalidateQueries({
        queryKey: "user",
      });

      navigate("/");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isFetching, login };
};
