const {
  readBooking,
  readBookingById,
  updateBooking,
} = require("../services/bookingApiService");

const ReadBookingFunc = async (req, res) => {
  const filter = req.query.filter;
  const sort = req.query.sort;
  const curPage = req.query.curPage;

  try {
    const data = await readBooking(filter, sort, curPage);

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

const ReadBookingByIdFunc = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await readBookingById(id);
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

const UpdateBookingFunc = async (req, res) => {
  try {
    const data = await updateBooking(req.body);

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
  ReadBookingFunc,
  ReadBookingByIdFunc,
  UpdateBookingFunc,
};
