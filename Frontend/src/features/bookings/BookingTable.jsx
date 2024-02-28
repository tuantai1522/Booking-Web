import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner.jsx";

import { useReadBooking } from "../../customHooks/useBooking/useReadBooking";
import Pagination from "../../ui/Pagination.jsx";

function BookingTable() {
  const { isFetching, data, error } = useReadBooking();

  if (isFetching) return <Spinner />;

  const { totalRows, totalPages, bookings } = data;

  return (
    <Table columns="0.6fr 1.5fr 1.5fr 1.4fr 1fr 1fr">
      <Table.Header>
        <div>Room</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div>Actions</div>
      </Table.Header>

      <Table.Body
        data={bookings}
        render={(booking) => <BookingRow key={booking.id} booking={booking} />}
      />

      <Table.Footer>
        <Pagination
          totalPages={totalPages}
          totalRows={totalRows}
          filterField={"curPage"}
        />
      </Table.Footer>
    </Table>
  );
}

export default BookingTable;
