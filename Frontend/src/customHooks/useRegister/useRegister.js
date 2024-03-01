import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { register as registerApi } from "../../services/apiRegister";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  const { isLoading: isRegistering, mutateAsync: register } = useMutation({
    mutationFn: registerApi,

    onSuccess: () => {
      navigate("/login");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isRegistering, register };
};
