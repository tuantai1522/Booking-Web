module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Booking", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      numGuests: {
        type: Sequelize.INTEGER,
      },
      roomPrice: {
        type: Sequelize.DOUBLE,
      },
      extraPrice: {
        type: Sequelize.DOUBLE,
      },
      status: {
        type: Sequelize.STRING,
      },
      hasBreakfast: {
        type: Sequelize.BOOLEAN,
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
      },
      observations: {
        type: Sequelize.STRING,
      },

      guestId: {
        type: Sequelize.INTEGER,
      },
      roomId: {
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
    await queryInterface.dropTable("Booking");
  },
};
