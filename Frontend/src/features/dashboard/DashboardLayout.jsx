import { Grid, Typography } from "@mui/material";

import DashboardFilter from "../dashboard/DashboardFilter";
import Spinner from "../../ui/Spinner";
import SalesChar from "./SalesChart";

import { useRecentBookings } from "../../customHooks/useDashboard/useRecentBookings";
import { useRecentStayings } from "../../customHooks/useDashboard/useRecentStatyings";
import { useReadRoom } from "../../customHooks/useRoom/useReadRoom";

import StatTable from "./StatTable";

function DashboardLayout() {
  const { isFetching: isloading1, bookings, numDays } = useRecentBookings();
  const { isFetching: isloading2, stayings } = useRecentStayings();
  const { isFetching: isLoading3, rooms } = useReadRoom();

  if (isloading1 || isloading2 || isLoading3) return <Spinner />;

  const dataBookings = bookings.DT;
  const dataStayings = stayings.DT;
  const totalRooms = rooms.length;

  return (
    <>
      <Grid
        style={{ marginBottom: "2rem" }}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h1" component="h1">
            Dashboard
          </Typography>
        </Grid>
        <Grid item>
          <DashboardFilter />
        </Grid>
      </Grid>
      <StatTable
        bookings={dataBookings}
        stayings={dataStayings}
        numDays={numDays}
        totalRooms={totalRooms}
      />
      <SalesChar bookings={dataBookings} numDays={numDays} />
    </>
  );
}

export default DashboardLayout;
