const db = require("../models/index.js");

const { deleteImageOnCloudinary } = require("../utils/helper.js");

const dotenv = require("dotenv");
dotenv.config();

const readRoom = async (filter, sort) => {
  try {
    const parts = sort.split("-"); // Cắt chuỗi thành mảng bằng dấu gạch ngang

    //parts[0] = regularPrice
    //parts[1] = DESC
    //SORT
    let rooms = await db.Room.findAll({
      attributes: [
        "id",
        "name",
        "maxCapacity",
        "regularPrice",
        "discount",
        "image",
        "description",
      ],
      order: [[parts[0], parts[1]]],
    });

    if (rooms) {
      //FILTER
      if (filter === "no-discount") {
        rooms = rooms.filter((room) => room.discount === 0);
      } else if (filter === "with-discount") {
        rooms = rooms.filter((room) => room.discount > 0);
      }

      return {
        EM: "get data successfully",
        EC: "0",
        DT: rooms,
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

const deleteRoom = async (roomId) => {
  try {
    const room = await db.Room.findOne({
      where: {
        id: roomId,
      },
    });
    if (room) {
      //delete record
      await db.Room.destroy({
        where: {
          id: roomId,
        },
      });

      //delete image on cloudinary
      const checkDelete = await deleteImageOnCloudinary(room.image);

      if (checkDelete) {
        return {
          EM: "Delete room successfully",
          EC: "0",
          DT: [],
        };
      } else {
        return {
          EM: "Failed to delete image on Cloudinary",
          EC: "1",
          DT: [],
        };
      }
    } else {
      return {
        EM: "can not find room to delete",
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

const createNewRoom = async (room) => {
  try {
    await db.Room.create(room);
    return {
      EM: `Create room successfully`,
      EC: "0",
      DT: [],
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Creating room fails",
      EC: "-1",
      DT: [],
    };
  }
};

const updateRoom = async (data) => {
  try {
    const room = await db.Room.findOne({
      where: {
        id: data.id,
      },
    });

    if (room) {
      //Nếu có image truyền lên => xóa hình cũ trên cloundinary
      if (typeof data.image === "string") {
        //delete image on cloudinary
        const checkDelete = await deleteImageOnCloudinary(room.image);

        if (!checkDelete) {
          return {
            EM: "Failed to delete image on Cloudinary",
            EC: "1",
            DT: [],
          };
        }
      }

      await db.Room.update(
        {
          name: data.name,
          maxCapacity: data.maxCapacity,
          regularPrice: data.regularPrice,
          discount: data.discount,
          description: data.description,
          image: typeof data.image === "string" ? data.image : room.image,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      return {
        EM: "update room successfully",
        EC: "0",
        DT: [],
      };
    } else {
      return {
        EM: "Can not find room to update",
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
  readRoom,
  deleteRoom,
  createNewRoom,
  updateRoom,
};
