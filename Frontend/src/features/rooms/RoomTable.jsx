import Table from "../../ui/Table.jsx";

import Spinner from "../../ui/Spinner.jsx";
import RoomRow from "../rooms/RoomRow.jsx";
import { useReadRoom } from "../../customHooks/useRoom/useReadRoom.js";

function RoomTable() {
  const { isFetching, rooms, error } = useReadRoom();

  if (isFetching) return <Spinner />;

  return (
    <Table columns={"0.6fr 1.2fr 2.2fr 1fr 1fr 1fr"}>
      <Table.Header>
        <div></div>
        <div>Room</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Actions</div>
      </Table.Header>

      <Table.Body
        data={rooms}
        render={(room) => <RoomRow room={room} key={room.id} />}
      />
    </Table>
  );
}

export default RoomTable;
