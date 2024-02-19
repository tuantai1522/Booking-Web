const { readGuest } = require("../services/guestApiService.js");

const ReadGuestFunc = async (req, res) => {
  try {
    const data = await readGuest();
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
  ReadGuestFunc,
};
