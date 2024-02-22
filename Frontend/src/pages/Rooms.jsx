import { Typography, Grid } from "@mui/material";
import RoomTable from "../features/rooms/RoomTable.jsx";
import AddRoom from "../features/rooms/AddRoom.jsx";
import RoomTableOperation from "../features/rooms/RoomTableOperation.jsx";

function Rooms() {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h1" component="h1">
            All Rooms
          </Typography>
        </Grid>
        <Grid item>
          <AddRoom />
        </Grid>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid item>
            <Grid container gap="4rem" alignItems="center">
              <Typography variant="h2" component="h2">
                <RoomTableOperation />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h3" component="h3">
        Table
      </Typography>
      <RoomTable />
    </>
  );
}

export default Rooms;
