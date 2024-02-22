import Modal from "../../ui/Modal";
import { Button } from "@mui/material";

import CreateRoomForm from "../rooms/CreateRoomForm.jsx";

function AddRoom() {
  return (
    <Modal>
      <Modal.Open openWindowName="add-room-form">
        <Button component="h1" size="large" variant="contained">
          Add new room
        </Button>
      </Modal.Open>
      <Modal.Window windowName="add-room-form">
        <CreateRoomForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddRoom;
