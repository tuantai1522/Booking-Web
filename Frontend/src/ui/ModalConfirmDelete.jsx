import { Button, Grid, Typography } from "@mui/material";

function ModalConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}) {
  return (
    <Grid container gap="1rem">
      <Typography variant="h2">Delete {resourceName}</Typography>

      <Typography variant="string">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </Typography>

      <Grid container justifyContent="flex-end" gap="2rem">
        <Button
          variant="contained"
          color="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          disabled={disabled}
          onClick={onConfirm}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}

export default ModalConfirmDelete;
