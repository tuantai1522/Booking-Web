"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init(
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      numNights: DataTypes.INTEGER,
      numGuests: DataTypes.INTEGER,
      roomPrice: DataTypes.DOUBLE,
      extraPrice: DataTypes.DOUBLE,
      status: DataTypes.STRING,
      hasBreakfast: DataTypes.BOOLEAN,
      isPaid: DataTypes.BOOLEAN,
      observations: DataTypes.STRING,

      guestId: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,
    },
    {
      tableName: "Booking",
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
