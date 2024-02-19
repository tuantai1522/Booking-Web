const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("booking-web", "root", null, {
  host: "localhost",
  dialect: "mysql",
  port: 3308, // must have (PORT of XAMPP)
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connection;
