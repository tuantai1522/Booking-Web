import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";

import { Button, Grid } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { toast } from "react-toastify";
import { useState } from "react";

import CreateRoomFrom from "../rooms/CreateRoomForm.jsx";
import { useDeleteRoom } from "../../customHooks/useRoom/useDeleteRoom.js";

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
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    room;

  const [isShowEditForm, setIsShowEditForm] = useState(false);

  const { isDeleting, deleteRoom } = useDeleteRoom();

  // Khi bạn muốn gọi hàm mutateFn:
  const handleDelete = async (id) => {
    try {
      const response = await deleteRoom(id);

      // Display toast
      if (response && +response.EC === 0) {
        toast.success(response.EM);
      } else {
        toast.error(response.EM);
      }
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const handleEdit = async () => {
    setIsShowEditForm((show) => !show);
  };

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Room>{name}</Room>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <Grid container>
          <Grid item xs={6}>
            <Button
              disable={isDeleting}
              onClick={() => handleDelete(id)}
              variant="contained"
              color="error"
            >
              <DeleteIcon />
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              disable={isDeleting}
              onClick={() => handleEdit()}
              variant="contained"
              color="error"
            >
              <EditIcon />
            </Button>
          </Grid>
        </Grid>
      </TableRow>
      {isShowEditForm && <CreateRoomFrom roomToEdit={room} />}
    </>
  );
}

export default RoomRow;
