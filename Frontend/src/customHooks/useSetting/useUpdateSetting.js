import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutateAsync: updateSetting } = useMutation({
    mutationFn: updateSettingApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: "settings",
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, updateSetting };
};
