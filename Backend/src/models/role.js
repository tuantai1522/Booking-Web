const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      Role.belongsToMany(models.Group, { through: "GroupRole" });
    }
  }
  Role.init(
    {
      url: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      tableName: "Role",
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
