import { Grid, Typography } from "@mui/material";
import Stat from "./Stat";

import StorefrontIcon from "@mui/icons-material/Storefront";
import PaidIcon from "@mui/icons-material/Paid";
import CheckIcon from "@mui/icons-material/Check";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

import { formatCurrency, subtractDates } from "../../utils/helpers";

function StatTable({ bookings, stayings, numDays, totalRooms }) {
  // 1.
  const numBookings = bookings.length;

  // 2.
  const sales = bookings.reduce(
    (acc, cur) => acc + cur.roomPrice + cur.extraPrice,
    0
  );

  //3.
  const numStayings = stayings.length;

  //4.
  const occupationRate =
    stayings.reduce(
      (acc, cur) => acc + subtractDates(cur.endDate, cur.startDate),
      0
    ) /
    (numDays * totalRooms);

  return (
    <>
      <Typography variant="h2" component="h2">
        Statistics
      </Typography>
      <Grid container alignItems="center" justifyContent="space-between">
        <Stat
          icon={<StorefrontIcon />}
          title={"Bookings"}
          value={numBookings}
          color={"blue"}
        />
        <Stat
          icon={<PaidIcon />}
          title={"Sales"}
          value={formatCurrency(sales)}
          color={"green"}
        />{" "}
        <Stat
          icon={<CheckIcon />}
          title={"Total checks"}
          value={numStayings}
          color={"red"}
        />{" "}
        <Stat
          icon={<AutoGraphIcon />}
          title={"Occupancy rate"}
          value={Math.round(occupationRate * 100) + "%"}
          color={"yellow"}
        />
      </Grid>
    </>
  );
}

export default StatTable;
