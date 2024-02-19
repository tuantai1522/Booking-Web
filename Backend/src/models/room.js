"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsToMany(models.Guest, { through: "Booking" });
    }
  }
  Room.init(
    {
      name: DataTypes.STRING,
      maxCapacity: DataTypes.INTEGER,
      regularPrice: DataTypes.INTEGER,
      discount: DataTypes.DOUBLE,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      tableName: "Room",
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
