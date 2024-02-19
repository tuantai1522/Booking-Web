const db = require("../models/index.js");

const readGuest = async () => {
  try {
    const guests = await db.Guest.findAll({
      attributes: ["id", "fullName", "email"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });

    if (guests) {
      return {
        EM: "get data successfully",
        EC: "0",
        DT: guests,
      };
    } else {
      return {
        EM: "get data successfully",
        EC: "0",
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "can not get data",
      EC: "-1",
      DT: [],
    };
  }
};

module.exports = {
  readGuest,
};
