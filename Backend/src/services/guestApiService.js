const readGuests = async () => {
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

const readGuestByEmail = async (email) => {
  try {
    const guest = await db.Guest.findOne({
      where: {
        email: email,
      },
    });

    return {
      EM: "get data successfully",
      EC: "0",
      DT: guest,
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
  readGuests,
  readGuestByEmail,
};
