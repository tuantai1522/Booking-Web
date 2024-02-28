const db = require("../models/index.js");
const { getGroupWithRoles } = require("./JWTService.js");

const { createJWT } = require("../middleware/JWTAction.js");

const logIn = async (data) => {
  const { email, passWord } = data;
  try {
    const guest = await db.Guest.findOne({
      // attributes: ["id", "fullName", "email"],
      include: { model: db.Group, attributes: ["name", "description"] },
      where: { email: email, passWord: passWord },
    });

    if (guest) {
      //get all roles of current user
      const groupWithRoles = await getGroupWithRoles(guest);

      //create JWT token
      const payload = { guest, groupWithRoles };
      const token = createJWT(payload);

      return {
        EM: "Sign in successfully",
        EC: "0",
        DT: {
          access_token: token,
          isAuthenticated: true,
          guest: {
            email: guest.email,
            fullName: guest.fullName,
            groupWithRoles,
          },
        },
      };
    } else {
      return {
        EM: "Email or password is not correct",
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
  logIn,
};
