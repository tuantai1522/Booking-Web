import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import Spinner from "../../ui/Spinner.jsx";

import { useReadRoom } from "../../customHooks/useRoom/useReadRoom";
import { useCreateBooking } from "../../customHooks/useBooking/useCreateBooking.js";
import { useForm } from "react-hook-form";

import { Flag } from "../../ui/Flag.jsx";

import { subtractDates } from "../../utils/helpers.js";

import { useGuest } from "../../context/GuestContext.jsx";
import { toast } from "react-toastify";

function PlaceBooking() {
  const today = new Date().toISOString().substr(0, 10);

  const { user } = useGuest();
  const { guest } = user;
  const { id: guestId } = guest;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: {
      startDate: today,
      endDate: today,
    },
  });
  const { errors } = formState;

  const { isFetching, rooms } = useReadRoom();
  const { isAdding, addBooking } = useCreateBooking();

  if (isFetching) return <Spinner />;

  const onSubmit = async (data) => {
    try {
      const retrivedData = { ...data, guestId };

      // If success, reset all values in form
      const response = await addBooking(retrivedData, {
        onSuccess: (response) => {
          if (response && +response.EC === 0) {
            reset();
          }
        },
      });

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
    <>
      <Typography style={{ textAlign: "center" }} variant="h1" component="h1">
        Make a booking
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ marginTop: "2rem", marginLeft: "6rem", marginRight: "6rem" }}
      >
        <Grid container alignItems="center" gap="1rem">
          <Grid item xs={2}>
            <Typography variant="h5">Start date</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="date"
              name="startDate"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              {...register("startDate", {
                required: "Start date field is required",
              })}
            />
          </Grid>
          <Grid item xs={4}>
            {errors?.startDate?.message && (
              <Typography variant="h6" color="error">
                {errors?.startDate?.message}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container alignItems="center" gap="1rem">
          <Grid item xs={2}>
            <Typography variant="h5">End date</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="date"
              name="endDate"
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("endDate", {
                required: "End Date field is required",
                validate: (value) =>
                  subtractDates(getValues().startDate, value) < 1 ||
                  "End Date must be after Start Date",
              })}
            />
          </Grid>
          <Grid item xs={4}>
            {errors?.endDate?.message && (
              <Typography variant="h6" color="error">
                {errors?.endDate?.message}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container alignItems="center" gap="1rem">
          <Grid item xs={2}>
            <Typography variant="h5">Num guests</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="number"
              name="numGuests"
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("numGuests", {
                required: "Num guests field is required",
                min: {
                  value: 1,
                  message: "Num guests should be at least one",
                },
              })}
            />
          </Grid>
          <Grid item xs={4}>
            {errors?.numGuests?.message && (
              <Typography variant="h6" color="error">
                {errors?.numGuests?.message}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container alignItems="center" gap="1rem">
          <Grid item xs={2}>
            <Typography variant="h5">Has breakfast</Typography>
          </Grid>
          <Grid item xs={5}>
            <FormControl>
              <RadioGroup
                name="hasBreakfast"
                defaultValue="1"
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <FormControlLabel
                  value="1"
                  {...register("hasBreakfast")}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  {...register("hasBreakfast")}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            {errors?.hasBreakfast?.message && (
              <Typography variant="h6" color="error">
                {errors?.hasBreakfast?.message}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container alignItems="center" gap="1rem">
          <Grid item xs={2}>
            <Typography variant="h5">Observations</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="text"
              name="observations"
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("observations")}
            />
          </Grid>
          <Grid item xs={5}></Grid>
        </Grid>
        <Grid container alignItems="center" gap="1rem">
          <Grid item xs={2}>
            <Typography variant="h5">Room</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              margin="normal"
              fullWidth
              label="Room"
              name="roomId"
              select
              {...register("roomId", {
                required: "Room field is required",
              })}
            >
              {rooms.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  <Grid container>
                    <Flag
                      src={room.image}
                      alt={`Image of ${room.name}`}
                      style={{ marginRight: "1rem" }}
                    />
                    <Typography style={{ display: "inline-block" }}>
                      {room.name}
                    </Typography>
                  </Grid>
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            {errors?.roomId?.message && (
              <Typography variant="h6" color="error">
                {errors?.roomId?.message}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="center" gap="1rem">
          <Button
            disabled={isAdding}
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <Typography variant="h5" component="h5">
              Place a booking
            </Typography>
          </Button>
        </Grid>
      </form>
    </>
  );
}

export default PlaceBooking;
