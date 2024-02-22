const db = require("../models/index.js");

const dotenv = require("dotenv");
dotenv.config();

const readBooking = async (
  filter,
  sort,
  curPage = +process.env.DEFAULT_CUR_PAGE
) => {
  try {
    const parts = sort.split("-"); // Cắt chuỗi thành mảng bằng dấu gạch ngang

    let bookings = await db.Booking.findAll({
      attributes: ["startDate", "endDate", "roomPrice", "extraPrice", "status"],
      include: [
        { model: db.Guest, attributes: ["fullName", "email"] },
        {
          model: db.Room,
          attributes: ["name"],
        },
      ],
      order: parts[0] !== "totalPrice" && [[parts[0], parts[1]]],
    });

    if (bookings) {
      //FILTER
      if (filter === "checked-out") {
        bookings = bookings.filter(
          (booking) => booking.status === "checked-out"
        );
      } else if (filter === "checked-in") {
        bookings = bookings.filter(
          (booking) => booking.status === "checked-in"
        );
      } else if (filter === "unconfirmed") {
        bookings = bookings.filter(
          (booking) => booking.status === "unconfirmed"
        );
      }

      //SORT
      if (parts[0] === "totalPrice") {
        bookings.sort((booking1, booking2) =>
          parts[1] === "ASC"
            ? booking1.roomPrice +
              booking1.extraPrice -
              (booking2.roomPrice + booking2.extraPrice)
            : booking2.roomPrice +
              booking2.extraPrice -
              (booking1.roomPrice + booking1.extraPrice)
        );
      }

      //Pagination

      const totalPages = Math.ceil(
        bookings.length / parseInt(process.env.DEFAULT_PAGE_SIZE)
      );
      const count = bookings.length;

      // Tính toán vị trí bắt đầu và kết thúc của mảng rows trên trang hiện tại
      const startIndex =
        (curPage - 1) * parseInt(process.env.DEFAULT_PAGE_SIZE);
      const endIndex = startIndex + parseInt(process.env.DEFAULT_PAGE_SIZE);

      bookings = bookings.slice(startIndex, endIndex);

      const data = {
        totalRows: count,
        totalPages: totalPages,
        bookings: bookings,
      };

      return {
        EM: "get data successfully",
        EC: "0",
        DT: data,
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
  readBooking,
};
