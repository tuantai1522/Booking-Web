const {
  readRoom,
  deleteRoom,
  createNewRoom,
  updateRoom,
} = require("../services/roomApiService");

const CreateRoomFunc = async (req, res) => {
  try {
    const data = await createNewRoom(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error",
      EC: "-1",
      DT: "",
    });
  }
};

const ReadRoomFunc = async (req, res) => {
  const filter = req.query.filter;
  const sort = req.query.sort;

  try {
    const data = await readRoom(filter, sort);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error",
      EC: "-1",
      DT: "",
    });
  }
};

const DeleteRoomFunc = async (req, res) => {
  try {
    if (req.query.roomId) {
      const data = await deleteRoom(req.query.roomId);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error",
      EC: "-1",
      DT: "",
    });
  }
};

const UpdateRoomFunc = async (req, res) => {
  try {
    const data = await updateRoom(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error",
      EC: "-1",
      DT: "",
    });
  }
};
module.exports = {
  ReadRoomFunc,
  DeleteRoomFunc,
  CreateRoomFunc,
  UpdateRoomFunc,
};
