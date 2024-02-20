const { sequelize } = require("../configs/connectDB.js");
const db = require("../models/index.js");

const dotenv = require("dotenv");
dotenv.config();

const readSetting = async () => {
  try {
    const setting = await db.Setting.findOne({
      attributes: [
        "id",
        "minBookingLength",
        "maxBookingLength",
        "maxGuestsPerRoom",
        "breakfastPrice",
      ],
    });

    if (setting) {
      return {
        EM: "get data successfully",
        EC: "0",
        DT: setting,
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

const updateSetting = async (data) => {
  try {
    const { field, value } = data;

    const setting = await db.Setting.findOne({});

    if (setting) {
      if (
        (field === "minBookingLength" && value > setting.maxBookingLength) ||
        (field === "maxBookingLength" && value < setting.minBookingLength)
      ) {
        return {
          EM: "Max booking length should be more than min booking length",
          EC: "1",
          DT: [],
        };
      }

      await db.Setting.update(
        {
          [field]: value,
        },
        {
          where: {
            id: setting.id,
          },
        }
      );

      return {
        EM: "update setting successfully",
        EC: "0",
        DT: [],
      };
    } else {
      return {
        EM: "Can not find setting to update",
        EC: "1",
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
  readSetting,
  updateSetting,
};
