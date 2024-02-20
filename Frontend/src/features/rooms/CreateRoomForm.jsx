import { useForm } from "react-hook-form";

import { TextField, Button, Typography, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
import { useCreateRoom } from "../../customHooks/useRoom/useCreateRoom";
import { useUpdateRoom } from "../../customHooks/useRoom/useUpdateRoom";

function CreateCabinForm({ roomToEdit }) {
  let room = {};

  if (roomToEdit) {
    room = {
      editId: roomToEdit.id,
      editName: roomToEdit.name,
      editMaxCapacity: roomToEdit.maxCapacity,
      editRegularPrice: roomToEdit.regularPrice,
      editDiscount: roomToEdit.discount,
      editImage: roomToEdit.image,
      editDescription: roomToEdit.description,
    };
  }

  const isEditing = Boolean(room.editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditing ? roomToEdit : {},
  });

  const [image, setImage] = useState([]);
  const { errors } = formState;

  const { isAdding, addRoom } = useCreateRoom();
  const { isUpdating, updateRoom } = useUpdateRoom();

  const isProcessing = isAdding || isUpdating;

  const onSubmit = async (data) => {
    const retrivedData = {
      ...data,
      image,
    };

    try {
      // If success, reset all values in form
      const response = isEditing
        ? await updateRoom(retrivedData)
        : await addRoom(retrivedData, { onSuccess: () => reset() });

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

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ marginTop: "2rem", marginLeft: "6rem", marginRight: "6rem" }}
      >
        <Grid container alignItems="center" gap="1rem">
          <Grid item xs={2}>
            <Typography variant="h5">Room name</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="text"
              name="name"
              label="Room name"
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("name", { required: "Name field is required" })}
            />
          </Grid>
          {errors?.name?.message && (
            <>
              <Grid item xs={5}>
                <Typography variant="h6" color="error">
                  {errors?.name?.message}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>

        <Grid container alignItems="center" gap="1rem">
          <Grid item xs={2}>
            <Typography variant="h5">Maximum capacity</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="number"
              name="maxCapacity"
              label="Maxium capacity"
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("maxCapacity", {
                required: "Maximum capacity field is required",
                min: {
                  value: 1,
                  message: "Capacity should be at least one",
                },
              })}
            />
          </Grid>
          {errors?.maxCapacity?.message && (
            <>
              <Grid item xs={5}>
                <Typography variant="h6" color="error">
                  {errors?.maxCapacity?.message}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>

        <Grid container alignItems="center" gap="1rem">
          <Grid item xs={2}>
            <Typography variant="h5">Regular price</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="number"
              name="regularPrice"
              label="Regular price"
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("regularPrice", {
                required: "Regular price field is required",
                min: {
                  value: 1,
                  message: "Regular price should be at least one",
                },
              })}
            />
          </Grid>
          {errors?.regularPrice?.message && (
            <>
              <Grid item xs={5}>
                <Typography variant="h6" color="error">
                  {errors?.regularPrice?.message}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>

        <Grid container alignItems="center" gap="1rem">
          <Grid item xs={2}>
            <Typography variant="h5">Discount</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="number"
              name="discount"
              label="Discount"
              variant="outlined"
              margin="normal"
              fullWidth
              defaultValue={0}
              {...register("discount", {
                required: "Discount field is required",
                validate: (value) =>
                  parseInt(value) <= parseInt(getValues().regularPrice) ||
                  "Discount should be less than regular price",
              })}
            />
          </Grid>
          {errors?.discount?.message && (
            <>
              <Grid item xs={5}>
                <Typography variant="h6" color="error">
                  {errors?.discount?.message}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>

        <Grid container alignItems="center" gap="1rem">
          <Grid item xs={2}>
            <Typography variant="h5">Description for website</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="text"
              name="description"
              label="Description for website"
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("description", {
                required: "Description field is required",
              })}
            />
          </Grid>
          {errors?.description?.message && (
            <>
              <Grid item xs={5}>
                <Typography variant="h6" color="error">
                  {errors?.description?.message}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>

        <Grid container alignItems="center" gap="1rem">
          <Grid item xs={2}>
            <Typography variant="h5">Room image</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="file"
              name="image"
              label="Room image"
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={handleImage}
            />
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: "2rem" }} alignItems="center">
          <Grid item xs={2}></Grid>

          <Grid item xs={5}>
            <Grid container gap="4rem" justifyContent="flex-end">
              <Button
                disabled={isProcessing}
                color="secondary"
                variant="contained"
                type="reset"
              >
                Cancel
              </Button>
              <Button
                disabled={isProcessing}
                type="submit"
                color="success"
                variant="contained"
              >
                {isEditing ? "Edit cabin" : `Add cabin`}
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={5}></Grid>
        </Grid>
      </form>
    </>
  );
}

export default CreateCabinForm;
