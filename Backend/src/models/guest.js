const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    static associate(models) {
      // define association here

      Guest.belongsTo(models.Group);
      Guest.belongsToMany(models.Room, { through: "Booking" });
    }
  }
  Guest.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      passWord: DataTypes.STRING,
      country: DataTypes.STRING,
      countryFlag: DataTypes.STRING,

      groupId: DataTypes.INTEGER,
    },
    {
      tableName: "Guest",
      sequelize,
      modelName: "Guest",
    }
  );
  return Guest;
};
