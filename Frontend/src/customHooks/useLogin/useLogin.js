import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logIn as logInApi } from "../../services/apiLogin";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useGuest } from "../../context/GuestContext";

export const useLogin = () => {
  const context = useGuest();

  const { user, setUser } = context;

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isLoading: isFetching, mutateAsync: login } = useMutation({
    mutationFn: logInApi,

    onSuccess: (data) => {
      //build data

      const retrivedData = data.DT;

      //setting user is current user after logging in
      setUser(retrivedData);

      navigate("/");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isFetching, login };
};
