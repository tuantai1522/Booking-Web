import { Typography, Grid } from "@mui/material";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

function Bookings() {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h1" component="h1">
            All Rooms
          </Typography>
        </Grid>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid item>
            <Grid container gap="4rem" alignItems="center">
              <Typography variant="h2" component="h2">
                <BookingTableOperations />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h3" component="h3">
        Table
      </Typography>
      <BookingTable />
    </>
  );
}

export default Bookings;
