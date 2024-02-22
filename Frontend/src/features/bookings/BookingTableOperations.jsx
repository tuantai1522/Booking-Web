import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="filter"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        filterField={"sort"}
        options={[
          { value: "startDate-DESC", label: "Sort by date (recent first)" },
          { value: "startDate-ASC", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-DESC",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-ASC", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
