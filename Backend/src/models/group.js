const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      // define association here
      Group.hasMany(models.Guest);
      Group.belongsToMany(models.Role, { through: "GroupRole" });
    }
  }
  Group.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      tableName: "Group",
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
