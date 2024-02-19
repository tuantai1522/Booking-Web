const express = require("express");

const { ReadGuestFunc } = require("../controllers/guestApiController.js");
const {
  ReadRoomFunc,
  DeleteRoomFunc,
  CreateRoomFunc,
  UpdateRoomFunc,
} = require("../controllers/roomApiController.js");

const uploadImage = require("../middleware/uploadImage.js");

const router = express.Router();

//CRUD => Create - Read - Update - Delete ROOM
router.get("/rooms/read", ReadRoomFunc);
router.delete("/rooms/delete", DeleteRoomFunc);

//lưu ảnh rồi mới lưu xuống database
router.post("/rooms/create", uploadImage, CreateRoomFunc);
router.put("/rooms/update", uploadImage, UpdateRoomFunc);

//CRUD => Create - Read - Update - Delete GUEST
router.get("/guests/read", ReadGuestFunc);

module.exports = router;
