import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function RoomTableOperation() {
  return (
    <div>
      <TableOperations>
        <Filter
          filterField={"filter"}
          options={[
            { label: "All", value: "all" },
            { label: "No discount", value: "no-discount" },
            { label: "With discount", value: "with-discount" },
          ]}
        />
        <SortBy
          filterField={"sort"}
          options={[
            { label: "Sort by name (A-Z)", value: "name-ASC" },
            { label: "Sort by name (Z-A)", value: "name-DESC" },
            { label: "Sort by price (low first)", value: "regularPrice-ASC" },
            { label: "Sort by price (high first)", value: "regularPrice-DESC" },
            { label: "Sort by capacity (low first)", value: "maxCapacity-ASC" },
            {
              label: "Sort by capacity (high first)",
              value: "maxCapacity-DESC",
            },
          ]}
        />
      </TableOperations>
    </div>
  );
}

export default RoomTableOperation;
