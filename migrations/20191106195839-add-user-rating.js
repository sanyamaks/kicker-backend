'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "rating", {
      allowNull: true,
      type: Sequelize.INTEGER,
      defaultValue: 1400
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "rating");
  }
};
