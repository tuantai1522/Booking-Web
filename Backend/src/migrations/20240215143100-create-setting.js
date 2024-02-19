module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Setting", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      minBookingLength: {
        type: Sequelize.INTEGER,
      },
      maxBookingLength: {
        type: Sequelize.INTEGER,
      },
      maxGuestsPerRoom: {
        type: Sequelize.INTEGER,
      },
      breakfastPrice: {
        type: Sequelize.DOUBLE,
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
    await queryInterface.dropTable("Setting");
  },
};
