import Modal from "../../ui/Modal";
import { Button } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import CreateRoomForm from "../rooms/CreateRoomForm.jsx";

function EditRoom({ roomToEdit }) {
  return (
    <Modal>
      <Modal.Open openWindowName="edit-room-form">
        <Button variant="contained" color="error">
          <EditIcon />
        </Button>
      </Modal.Open>
      <Modal.Window windowName="edit-room-form">
        <CreateRoomForm roomToEdit={roomToEdit} />
      </Modal.Window>
    </Modal>
  );
}

export default EditRoom;
