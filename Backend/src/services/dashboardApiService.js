const db = require("../models/index.js");

const { calcDate } = require("../utils/helper.js");

const dotenv = require("dotenv");
dotenv.config();

//Actual sales
const readBookingsAfterDate = async (
  last = process.env.DEFAULT_LAST_DAY_FILTER_DASHBOARD
) => {
  try {
    let bookings = await db.Booking.findAll({
      attributes: ["id", "roomPrice", "extraPrice", "createdAt"],
    });

    //Filter
    const today = new Date();
    const day = calcDate(today, -parseInt(last), 0, 0);

    bookings = bookings.filter((booking) => {
      const dateFromString = new Date(booking.createdAt);

      return dateFromString > day;
    });

    return {
      EM: "get data successfully",
      EC: "0",
      DT: bookings,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "can not get data",
      EC: "-1",
      DT: [],
    };
  }
};

//Current staying
const readStayingsAfterDate = async (
  last = process.env.DEFAULT_LAST_DAY_FILTER_DASHBOARD
) => {
  try {
    let stayings = await db.Booking.findAll({
      attributes: [
        "id",
        "roomPrice",
        "extraPrice",
        "createdAt",
        "startDate",
        "endDate",
        "status",
      ],
    });

    //Filter
    const today = new Date();
    const day = calcDate(today, -parseInt(last), 0, 0);

    stayings = stayings.filter((staying) => {
      const dateFromString = new Date(staying.createdAt);

      return dateFromString > day && staying.status !== "unconfirmed";
    });

    return {
      EM: "get data successfully",
      EC: "0",
      DT: stayings,
    };
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
  readBookingsAfterDate,
  readStayingsAfterDate,
};
