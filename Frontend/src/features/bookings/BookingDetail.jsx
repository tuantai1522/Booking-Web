import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Tag from "../../ui/Tag";
import Spinner from "../../ui/Spinner.jsx";

import { useMoveBack } from "../../hooks/useMoveBack";
import { Button, Grid, Typography } from "@mui/material";
import { useReadBookingById } from "../../customHooks/useBooking/useReadBookingById";
import { useNavigate } from "react-router-dom";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isFetching, booking, error } = useReadBookingById();

  const moveBack = useMoveBack();

  if (isFetching) return <Spinner />;

  if (!booking) return <Typography>No data to found</Typography>;

  const { id, status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Grid
        style={{ marginBottom: "3rem" }}
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <HeadingGroup>
          <Typography variant="h3" component="h3">
            Booking #{id}
          </Typography>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <Button component="h3" variant="contained" onClick={moveBack}>
          <Typography variant="h6" component="h6">
            &larr; Back
          </Typography>
        </Button>
      </Grid>

      <BookingDataBox booking={booking} />

      {/* Check in and check out */}
      <Grid style={{ marginTop: "2rem" }} container justifyContent="flex-end">
        {status === "unconfirmed" && (
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate(`/checkin/${id}`)}
          >
            <Typography variant="h6" component="h6">
              Check in
            </Typography>
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate(`/checkout/${id}`)}
          >
            <Typography color="danger" variant="h6" component="h6">
              Check out
            </Typography>
          </Button>
        )}
      </Grid>
    </>
  );
}

export default BookingDetail;
