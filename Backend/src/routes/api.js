const express = require("express");

const {
  ReadGuestFunc,
  ReadGuestByEmailFunc,
} = require("../controllers/guestApiController.js");
const {
  ReadRoomFunc,
  DeleteRoomFunc,
  CreateRoomFunc,
  UpdateRoomFunc,
} = require("../controllers/roomApiController.js");

const {
  ReadSettingFunc,
  UpdateSettingFunc,
} = require("../controllers/settingApiController.js");

const {
  ReadBookingFunc,
  ReadBookingByIdFunc,
  UpdateBookingFunc,
} = require("../controllers/bookingApiController.js");

const { LoginFunc, LogoutFunc } = require("../controllers/apiController.js");

const uploadImage = require("../middleware/uploadImage.js");
const {
  checkUserLogin,
  checkUserPermission,
} = require("../middleware/JWTAction.js");

const router = express.Router();

router.all("*", checkUserLogin, checkUserPermission);

//CRUD => Login GUEST
router.post("/login", LoginFunc);
router.post("/logout", LogoutFunc);

//CRUD => Create - Read - Update - Delete ROOM
router.get("/rooms/read", checkUserLogin, ReadRoomFunc);
router.delete("/rooms/delete", DeleteRoomFunc);

//lưu ảnh rồi mới lưu xuống database
router.post("/rooms/create", uploadImage, CreateRoomFunc);
router.put("/rooms/update", checkUserLogin, uploadImage, UpdateRoomFunc);

//CRUD => Create - Read - Update - Delete GUEST
router.get("/guests/read", ReadGuestFunc);
router.get("/guests/read/:email", ReadGuestByEmailFunc);

//CRUD => Create - Read - Update - Delete BOOKING
router.get("/bookings/read", ReadBookingFunc);
router.get("/bookings/read/:id", ReadBookingByIdFunc);
router.put("/bookings/update", UpdateBookingFunc);

//CRUD => Create - Read - Update - Delete SETTING
router.get("/settings/read", ReadSettingFunc);
router.put("/settings/update", UpdateSettingFunc);

module.exports = router;
