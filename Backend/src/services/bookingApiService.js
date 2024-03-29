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
      attributes: [
        "id",
        "startDate",
        "endDate",
        "roomPrice",
        "extraPrice",
        "status",
        "createdAt",
      ],
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

const readBookingById = async (id) => {
  try {
    const booking = await db.Booking.findOne({
      attributes: [
        "id",
        "createdAt",
        "startDate",
        "endDate",
        "extraPrice",
        "guestId",
        "hasBreakfast",
        "isPaid",
        "numGuests",
        "observations",
        "roomId",
        "roomPrice",
        "status",
      ],
      include: [
        {
          model: db.Guest,
          attributes: ["fullName", "email", "country", "countryFlag"],
        },
        {
          model: db.Room,
          attributes: ["name"],
        },
      ],
      where: {
        id: id,
      },
    });

    return {
      EM: "get data successfully",
      EC: "0",
      DT: booking,
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

const updateBooking = async (data) => {
  const {
    bookingId,
    status,
    breakFast: { extraPrice, hasBreakfast },
  } = data;

  try {
    const booking = await db.Booking.findOne({
      where: {
        id: bookingId,
      },
    });

    if (booking) {
      //Update check in

      if (data.status === "unconfirmed") {
        await db.Booking.update(
          {
            status: "checked-in",
            isPaid: 1,
            extraPrice: extraPrice,
            hasBreakfast: hasBreakfast,
          },
          {
            where: {
              id: bookingId,
            },
          }
        );
      } else if (status === "checked-in") {
        await db.Booking.update(
          {
            status: "checked-out",
          },
          {
            where: {
              id: bookingId,
            },
          }
        );
      }
      return {
        EM: "update booking successfully",
        EC: "0",
        DT: [],
      };
    } else {
      return {
        EM: "Can not find booking to update",
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

const createBooking = async (booking) => {
  try {
    //To find room by roomId
    const { roomId, numGuests } = booking;
    const room = await db.Room.findOne({
      attributes: ["id", "name", "maxCapacity", "regularPrice", "discount"],
      where: {
        id: roomId,
      },
    });

    if (parseInt(numGuests) > parseInt(room.maxCapacity)) {
      return {
        EM: `This room only has maximum ${room.maxCapacity} guests`,
        EC: "1",
        DT: [],
      };
    }

    const roomPrice = room.regularPrice - room.discount;

    const setting = await db.Setting.findOne({
      attributes: [
        "id",
        "minBookingLength",
        "maxBookingLength",
        "maxGuestsPerRoom",
        "breakfastPrice",
      ],
    });
    let extraPrice = 0;

    if (parseInt(booking.hasBreakfast) === 1) {
      extraPrice = numGuests * setting.breakfastPrice;
    }
    const data = {
      ...booking,
      roomPrice,
      extraPrice,
      status: "unconfirmed",
      isPaid: 0,
    };

    await db.Booking.create(data);
    return {
      EM: `Create booking successfully`,
      EC: "0",
      DT: [],
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Creating booking fails",
      EC: "-1",
      DT: [],
    };
  }
};
module.exports = {
  readBooking,
  readBookingById,
  updateBooking,
  createBooking,
};
