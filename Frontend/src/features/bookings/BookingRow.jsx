import { ThemeProvider } from "@mui/material/styles";

import createTheme from "@mui/material/styles/createTheme";

import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { Button, Grid } from "@mui/material";
import { lime, purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
  },
});

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const navigate = useNavigate();
  const {
    id,
    startDate,
    endDate,
    roomPrice,
    extraPrice,
    status,
    Guest: { fullName: guestName, email },
    Room: { name: roomName },
  } = booking;

  const totalPrice = roomPrice + extraPrice;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{roomName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Grid container gap="2rem">
        <ThemeProvider theme={theme}>
          <Button
            onClick={() => navigate(`/bookings/${id}`)}
            variant="contained"
          >
            See details
          </Button>
        </ThemeProvider>
      </Grid>
    </Table.Row>
  );
}

export default BookingRow;
