import Spinner from "../../ui/Spinner.jsx";

import { useReadBookingById } from "../../customHooks/useBooking/useReadBookingById.js";

import CheckBooking from "./CheckBooking.jsx";

function CheckinBooking() {
  const { isFetching, booking, error } = useReadBookingById();

  if (isFetching) return <Spinner />;

  return <CheckBooking type="checked-out" booking={booking} />;
}

export default CheckinBooking;
