import styled from "styled-components";

import BookingDataBox from "../bookings/BookingDataBox.jsx";

import { useMoveBack } from "../../hooks/useMoveBack.js";

import { useUpdateBooking } from "../../customHooks/useBooking/useUpdateBooking.js";
import { useReadSetting } from "../../customHooks/useSetting/useReadSetting";

import Spinner from "../../ui/Spinner.jsx";

import { subtractDates, formatCurrency } from "../../utils/helpers";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function CheckBooking({ type, booking }) {
  const [confirm, setConfirm] = useState(false);

  const [isBreakfast, setIsBreakfast] = useState(false);

  const moveBack = useMoveBack();

  const { isUpdating, updateBooking } = useUpdateBooking();

  const { isFetching, setting, error } = useReadSetting();

  if (isFetching || isUpdating) return <Spinner />;

  const {
    id: bookingId,
    status,
    Guest: { fullName: guestName },
    startDate,
    endDate,
    numGuests,
    roomPrice,
    hasBreakfast,
    extraPrice,
  } = booking;

  const { breakfastPrice } = setting;

  const numNights = subtractDates(endDate, startDate);

  const optionBreakfastPrice = breakfastPrice * numGuests * numNights;

  const totalPrice = isBreakfast ? optionBreakfastPrice + roomPrice : roomPrice;

  const handleCheck = async () => {
    try {
      if (!confirm) {
        toast.error("Please confirm before continue");
        return;
      }

      const retrivedData = {
        bookingId,
        status,
        breakFast: isBreakfast
          ? {
              hasBreakfast: 1,
              extraPrice: optionBreakfastPrice,
            }
          : {
              hasBreakfast: hasBreakfast,
              extraPrice: extraPrice,
            },
      };
      // If success, reset all values in form
      const response = await updateBooking(retrivedData);

      // Display toast
      if (response && +response.EC === 0) {
        toast.success(response.EM);
        moveBack();
      } else {
        toast.error(response.EM);
      }
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const handleChangeConfirm = (event) => {
    setConfirm(event.target.checked);
  };

  const handleChangeOptionalBreakfast = (event) => {
    setIsBreakfast(event.target.checked);
    setConfirm(false);
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
            {type === "checked-in" ? "Check in" : "Check out"} booking #
            {bookingId}
          </Typography>
        </HeadingGroup>
        <Button component="h3" variant="contained" onClick={moveBack}>
          <Typography variant="h5" component="h5">
            &larr; Back
          </Typography>
        </Button>
      </Grid>

      <BookingDataBox booking={booking} />

      {/* Check in, breakfast and check out */}

      {/* Nếu chưa check in có thể thêm breakfast */}
      {status === "unconfirmed" && !hasBreakfast && (
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          checked={isBreakfast}
          disabled={isUpdating}
          onChange={handleChangeOptionalBreakfast}
          label={
            <Typography variant="h5" component="h5">
              {guestName} wants to add breakfast{" "}
              {formatCurrency(breakfastPrice * numGuests)} for {numGuests} guest
              in {numNights} days ({formatCurrency(optionBreakfastPrice)})
            </Typography>
          }
        />
      )}

      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          checked={confirm}
          disabled={isUpdating}
          onChange={handleChangeConfirm}
          label={
            <Typography variant="h5" component="h5">
              I will confirm that {guestName}
              {status === "unconfirmed"
                ? ` has already paid ${formatCurrency(
                    totalPrice
                  )} (${formatCurrency(roomPrice)}${
                    isBreakfast
                      ? ` + ${formatCurrency(optionBreakfastPrice)}`
                      : ""
                  }) and checked in`
                : " will check out"}
            </Typography>
          }
        />
      </FormGroup>

      <Grid container justifyContent="flex-end">
        {status === "unconfirmed" && (
          <Button variant="contained" color="success" onClick={handleCheck}>
            <Typography variant="h5" component="h5">
              Confirm
            </Typography>
          </Button>
        )}

        {status === "checked-in" && (
          <Button variant="contained" color="error" onClick={handleCheck}>
            <Typography variant="h5" component="h5">
              Confirm
            </Typography>
          </Button>
        )}
      </Grid>
    </>
  );
}

export default CheckBooking;
