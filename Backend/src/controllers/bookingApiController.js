const { readBooking } = require("../services/bookingApiService");

const ReadBookingFunc = async (req, res) => {
  const filter = req.query.filter;
  const sort = req.query.sort;
  const curPage = req.query.curPage;

  console.log(filter, sort, curPage);
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

module.exports = {
  ReadBookingFunc,
};
