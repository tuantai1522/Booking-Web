const {
  readBookingsAfterDate,
  readStayingsAfterDate,
} = require("../services/dashboardApiService");

const ReadBookingAfterDateFunc = async (req, res) => {
  const last = req.query.last;

  try {
    const data = await readBookingsAfterDate(last);

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

const ReadStayingAfterDateFunc = async (req, res) => {
  const last = req.query.last;

  try {
    const data = await readStayingsAfterDate(last);

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
  ReadBookingAfterDateFunc,
  ReadStayingAfterDateFunc,
};
