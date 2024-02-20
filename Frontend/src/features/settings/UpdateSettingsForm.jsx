import { Grid, TextField, Typography } from "@mui/material";
import { useReadSetting } from "../../customHooks/useSetting/useReadSetting";

import Spinner from "../../ui/Spinner.jsx";
import { useUpdateSetting } from "../../customHooks/useSetting/useUpdateSetting.js";
import { toast } from "react-toastify";

function UpdateSettingsForm() {
  const { isFetching, setting, error } = useReadSetting();
  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isFetching) return <Spinner />;

  const {
    id,
    minBookingLength,
    maxBookingLength,
    maxGuestsPerRoom,
    breakfastPrice,
  } = setting;

  const handleUpdate = async (e, field) => {
    const { value } = e.target;

    if (!value) return;

    const retrivedData = {
      field,
      value,
    };

    try {
      // If success, reset all values in form
      const response = await updateSetting(retrivedData);

      // Display toast
      if (response && +response.EC === 0) {
        toast.success(response.EM);
      } else {
        toast.error(response.EM);
      }
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  return (
    <form
      style={{ marginTop: "2rem", marginLeft: "6rem", marginRight: "6rem" }}
    >
      <Grid container alignItems="center" gap="1rem">
        <Grid item xs={2}>
          <Typography variant="h5">Minimum booking length</Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField
            type="number"
            name="minBookingLength"
            label="Minimum booking length"
            variant="outlined"
            margin="normal"
            fullWidth
            defaultValue={minBookingLength}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "minBookingLength")}
          />
        </Grid>
      </Grid>

      <Grid container alignItems="center" gap="1rem">
        <Grid item xs={2}>
          <Typography variant="h5">Maximum booking length</Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField
            type="number"
            name="maxBookingLength"
            label="Maximum booking length"
            variant="outlined"
            margin="normal"
            fullWidth
            defaultValue={maxBookingLength}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          />
        </Grid>
      </Grid>

      <Grid container alignItems="center" gap="1rem">
        <Grid item xs={2}>
          <Typography variant="h5">Max guest per room</Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField
            type="number"
            name="maxGuestsPerRoom"
            label="Max guest per room"
            variant="outlined"
            margin="normal"
            fullWidth
            defaultValue={maxGuestsPerRoom}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "maxGuestsPerRoom")}
          />
        </Grid>
      </Grid>

      <Grid container alignItems="center" gap="1rem">
        <Grid item xs={2}>
          <Typography variant="h5">Breakfast price</Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField
            type="number"
            name="breakfastPrice"
            label="Breakfast price"
            variant="outlined"
            margin="normal"
            fullWidth
            defaultValue={breakfastPrice}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdateSettingsForm;
