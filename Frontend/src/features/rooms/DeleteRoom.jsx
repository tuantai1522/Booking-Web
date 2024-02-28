import Modal from "../../ui/Modal";
import { Button } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete.js";

import { useDeleteRoom } from "../../customHooks/useRoom/useDeleteRoom.js";
import ModalConfirmDelete from "../../ui/ModalConfirmDelete.jsx";
import { toast } from "react-toastify";

function DeleteRoom({ roomIdToDelete }) {
  const { isDeleting, deleteRoom } = useDeleteRoom();

  // Khi bạn muốn gọi hàm mutateFn:
  const onDelete = async (id) => {
    const response = await deleteRoom(roomIdToDelete);

    // Display toast
    if (response && +response.EC === 0) {
      toast.success(response.EM);
    } else {
      toast.error(response.EM);
    }
  };

  return (
    <Modal>
      <Modal.Open openWindowName="delete-room-form">
        <Button disabled={isDeleting} variant="contained" color="error">
          <DeleteIcon />
        </Button>
      </Modal.Open>
      <Modal.Window windowName="delete-room-form">
        <ModalConfirmDelete
          resourceName="room"
          onConfirm={onDelete}
          disabled={isDeleting}
        />
      </Modal.Window>
    </Modal>
  );
}

export default DeleteRoom;
