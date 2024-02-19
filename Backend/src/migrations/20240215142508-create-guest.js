module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Guest", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      passWord: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      countryFlag: {
        type: Sequelize.STRING,
      },

      groupId: {
        type: Sequelize.INTEGER,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Guest");
  },
};
