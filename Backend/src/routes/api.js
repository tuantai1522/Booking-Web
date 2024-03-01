const express = require("express");

const { ReadGuestFunc } = require("../controllers/guestApiController.js");
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
  CreateBookingFunc,
} = require("../controllers/bookingApiController.js");

const {
  LoginFunc,
  LogoutFunc,
  RegisterFunc,
} = require("../controllers/apiController.js");

const {
  ReadBookingAfterDateFunc,
  ReadStayingAfterDateFunc,
} = require("../controllers/dashboardApiController.js");

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
router.post("/register", RegisterFunc);

//CRUD => Create - Read - Update - Delete ROOM
router.get("/rooms/read", checkUserLogin, ReadRoomFunc);
router.delete("/rooms/delete", DeleteRoomFunc);

//lưu ảnh rồi mới lưu xuống database
router.post("/rooms/create", uploadImage, CreateRoomFunc);
router.put("/rooms/update", checkUserLogin, uploadImage, UpdateRoomFunc);

//CRUD => Create - Read - Update - Delete GUEST
router.get("/guests/read", ReadGuestFunc);

//CRUD => Create - Read - Update - Delete BOOKING
router.get("/bookings/read", ReadBookingFunc);
router.get("/bookings/read/:id", ReadBookingByIdFunc);
router.put("/bookings/update", UpdateBookingFunc);
router.post("/bookings/create", CreateBookingFunc);

//CRUD => Create - Read - Update - Delete SETTING
router.get("/settings/read", ReadSettingFunc);
router.put("/settings/update", UpdateSettingFunc);

//CRUD => Read Dashboard
router.get("/dashboard/bookings-after-day", ReadBookingAfterDateFunc);
router.get("/dashboard/statyings-after-day", ReadStayingAfterDateFunc);

module.exports = router;
