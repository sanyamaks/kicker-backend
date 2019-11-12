"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "externalId");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "externalId", {
      allowNull: true,
      type: Sequelize.STRING
    });
  }
};
