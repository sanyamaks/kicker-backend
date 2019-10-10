"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Tournaments", "startDate", {
      allowNull: false,
      type: Sequelize.DATE
    });
    await queryInterface.addColumn("Tournaments", "endDate", {
      allowNull: false,
      type: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Tournaments", "startDate");
    await queryInterface.removeColumn("Tournaments", "endDate");
  }
};
