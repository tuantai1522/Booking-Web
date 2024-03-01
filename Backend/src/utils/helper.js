const cloudinary = require("../configs/cloudinary.config.js");

const dotenv = require("dotenv");
dotenv.config();

const deleteImageOnCloudinary = async (imageString) => {
  try {
    // Tách URL thành các phần bằng dấu '/'
    const parts = imageString.split("/");

    // Lấy phần cuối cùng của mảng, chứa tên tệp và đuôi mở rộng
    const filenameWithExtension = parts[parts.length - 1];

    // Tách tên tệp và đuôi mở rộng bằng dấu '.'
    const [filename, extension] = filenameWithExtension.split(".");

    const imgId = `${process.env.FOLDER_CLOUDINARY}/${filename}`;

    await cloudinary.uploader.destroy(imgId);

    return true; // Trả về true nếu xóa ảnh thành công
  } catch (error) {
    console.error("Error deleting image on Cloudinary:", error);
    return false; // Trả về false nếu có lỗi xảy ra
  }
};

const calcDate = (input, days, months, years) => {
  return new Date(
    input.getFullYear() + years,
    input.getMonth() + months,
    Math.min(
      input.getDate() + days,
      new Date(
        input.getFullYear() + years,
        input.getMonth() + months + 1,
        0
      ).getDate()
    )
  );
};

//console.log(deltaDate(new Date(), 0, -1, 0));
module.exports = {
  deleteImageOnCloudinary,
  calcDate,
};
