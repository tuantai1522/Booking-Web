import styled from "styled-components";

import Spinner from "../../ui/Spinner.jsx";
import RoomRow from "../rooms/RoomRow.jsx";
import { useReadRoom } from "../../customHooks/useRoom/useReadRoom.js";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  padding: 2rem;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.2fr 2.2fr 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 1.6rem;
`;

function RoomTable() {
  const { isFetching, rooms, error } = useReadRoom();

  if (isFetching) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader>
        <div></div>
        <div>Room</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>

      {rooms.map((room) => (
        <RoomRow room={room} key={room.id} />
      ))}
    </Table>
  );
}

export default RoomTable;
