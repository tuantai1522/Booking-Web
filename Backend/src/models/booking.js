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
      Booking.belongsTo(models.Guest, { foreignKey: "guestId" }); // Quan hệ ngược lại với mô hình Guest
      Booking.belongsTo(models.Room, { foreignKey: "roomId" }); // Quan hệ ngược lại với mô hình Room
    }
  }
  Booking.init(
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
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
