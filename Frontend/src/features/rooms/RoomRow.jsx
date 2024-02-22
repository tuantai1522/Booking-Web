import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";

import { Grid } from "@mui/material";

import EditRoom from "./EditRoom.jsx";
import DeleteRoom from "./DeleteRoom.jsx";
import Table from "../../ui/Table.jsx";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.2fr 2.2fr 1fr 1fr 1fr;
  align-items: center;
  padding: 1.6rem 1.6rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Room = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function RoomRow({ room }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = room;

  return (
    <Table.Row role="row">
      <Img src={image} />
      <Room>{name}</Room>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>
        {" "}
        {discount !== 0 ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
      </Discount>
      <Grid container gap="2rem">
        <Grid item xs={5}>
          <DeleteRoom roomIdToDelete={id} />
        </Grid>

        <Grid item xs={5}>
          <EditRoom roomToEdit={room} />
        </Grid>
      </Grid>
    </Table.Row>
  );
}

export default RoomRow;
