import { Typography, Grid, Button } from "@mui/material";
import RoomTable from "../features/rooms/RoomTable.jsx";
import { useState } from "react";
import CreateCabinForm from "../features/rooms/CreateRoomForm.jsx";

function Rooms() {
  const [showAddForm, setShowAddForm] = useState(false);
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h1" component="h1">
            All Rooms
          </Typography>
        </Grid>
        <Grid item>
          <Grid container gap="4rem">
            <Button
              onClick={() => setShowAddForm((show) => !show)}
              component="h1"
              size="large"
              variant="contained"
            >
              Add new room
            </Button>
            <Typography variant="h2" component="h2">
              Filter/Sort
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h3" component="h3">
        Table
      </Typography>
      <RoomTable />
      {showAddForm && <CreateCabinForm />}
    </>
  );
}

export default Rooms;
