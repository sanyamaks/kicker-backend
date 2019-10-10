"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable("TournamentGames", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tournamentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Tournaments",
          key: "id"
        }
      },
      team1Id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Teams",
          key: "id"
        }
      },
      team2Id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Teams",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    return queryInterface.createTable("TournamentGamesGames", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      gameId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Games",
          key: "id"
        },
        allowNull: false
      },
      tournamentGameId: {
        type: Sequelize.INTEGER,
        references: {
          model: "TournamentGames",
          key: "id"
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable("TournamentGamesGames");
    return queryInterface.dropTable("TournamentGames");
  }
};
