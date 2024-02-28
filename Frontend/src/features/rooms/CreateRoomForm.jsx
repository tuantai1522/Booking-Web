import { useForm } from "react-hook-form";

import { TextField, Button, Typography, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
import { useCreateRoom } from "../../customHooks/useRoom/useCreateRoom";
import { useUpdateRoom } from "../../customHooks/useRoom/useUpdateRoom";

function CreateRoomForm({ roomToEdit, onCloseModal }) {
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

    // If success, reset all values in form
    const response = isEditing
      ? await updateRoom(retrivedData, {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        })
      : await addRoom(retrivedData, {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        });

    // Display toast
    if (response && +response.EC === 0) {
      toast.success(response.EM);
    } else {
      toast.error(response.EM);
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "80rem" }}>
        <Grid container justifyContent="center" alignItems="center" gap="1rem">
          <Grid item xs={3}>
            <Typography variant="h5">Room name</Typography>
          </Grid>
          <Grid item xs={4}>
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
          <Grid item xs={4}>
            {errors?.name?.message && (
              <Typography variant="h6" color="error">
                {errors?.name?.message}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" gap="1rem">
          <Grid item xs={3}>
            <Typography variant="h5">Maximum capacity</Typography>
          </Grid>
          <Grid item xs={4}>
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
          <Grid item xs={4}>
            {errors?.maxCapacity?.message && (
              <Typography variant="h6" color="error">
                {errors?.maxCapacity?.message}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" gap="1rem">
          <Grid item xs={3}>
            <Typography variant="h5">Regular price</Typography>
          </Grid>
          <Grid item xs={4}>
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
          <Grid item xs={4}>
            {errors?.regularPrice?.message && (
              <Typography variant="h6" color="error">
                {errors?.regularPrice?.message}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" gap="1rem">
          <Grid item xs={3}>
            <Typography variant="h5">Discount</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              name="discount"
              label="Discount"
              variant="outlined"
              margin="normal"
              fullWidth
              defaultValue={0}
              {...register("discount", {
                validate: (value) =>
                  parseInt(value) <= parseInt(getValues().regularPrice) ||
                  "Discount should be less than regular price",
              })}
            />
          </Grid>
          <Grid item xs={4}>
            {errors?.discount?.message && (
              <Typography variant="h6" color="error">
                {errors?.discount?.message}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" gap="1rem">
          <Grid item xs={3}>
            <Typography variant="h5">Description for website</Typography>
          </Grid>
          <Grid item xs={4}>
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
          <Grid item xs={4}>
            {errors?.description?.message && (
              <Typography variant="h6" color="error">
                {errors?.description?.message}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" gap="1rem">
          <Grid item xs={3}>
            <Typography variant="h5">Room image</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="file"
              name="image"
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={handleImage}
            />
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          style={{ marginTop: "2rem" }}
          alignItems="center"
        >
          <Grid item xs={2}></Grid>

          <Grid item xs={5}>
            <Grid container gap="4rem" justifyContent="flex-end">
              <Button
                disabled={isProcessing}
                color="secondary"
                variant="contained"
                type="reset"
                //Nếu có prop onCloseModal truyền vào thì mới ấn được
                onClick={() => onCloseModal?.()}
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

export default CreateRoomForm;
