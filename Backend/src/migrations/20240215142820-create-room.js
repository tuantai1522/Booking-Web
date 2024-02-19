module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Room", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      maxCapacity: {
        type: Sequelize.INTEGER,
      },
      regularPrice: {
        type: Sequelize.INTEGER,
      },
      discount: {
        type: Sequelize.DOUBLE,
      },
      description: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Room");
  },
};
