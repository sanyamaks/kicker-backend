"use strict";

var configs = require("../sequelizeConfig.js");
var env = process.env.NODE_ENV || "development";
var config = configs[env];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `ALTER DATABASE ${config.database} CHARACTER SET utf8 COLLATE utf8_unicode_ci`
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE Users CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE Tournaments CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE TournamentTeams CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE TournamentGamesGames CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE TournamentGames CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE Teams CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE Goals CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE Games CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE GamePlayers CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci"
    );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve();
  }
};
