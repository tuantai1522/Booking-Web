const db = require("../models/index.js");

//to know all roles of group
const getGroupWithRoles = async (guest) => {
  try {
    const roles = await db.Group.findOne({
      where: { id: guest.groupId },
      attributes: ["id", "name", "description"],

      include: [
        {
          model: db.Role,
          attributes: ["id", "url", "description"],
          through: { attributes: [] },
        },
      ],
    });
    return roles ? roles : {};
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getGroupWithRoles };
