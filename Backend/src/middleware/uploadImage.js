const cloudinary = require("../configs/cloudinary.config");

const dotenv = require("dotenv");
dotenv.config();

const uploadImage = async (req, res, next) => {
  const { image } = req.body;

  try {
    //up ảnh mới thì xóa trên cloundinary
    if (typeof image === "string") {
      const result = await cloudinary.uploader.upload(image, {
        folder: process.env.FOLDER_CLOUDINARY,
      });

      //build data for next middleware
      req.body = {
        ...req.body,
        image: result.secure_url,
      };

      //không up ảnh mới thì không làm gì
    } else {
      req.body = req.body;
    }

    next();
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
};

module.exports = uploadImage;
