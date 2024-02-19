const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class GroupRole extends Model {
    static associate(models) {
      // define association here
    }
  }
  GroupRole.init(
    {
      groupId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
    },
    {
      tableName: "GroupRole",
      sequelize,
      modelName: "GroupRole",
    }
  );
  return GroupRole;
};
