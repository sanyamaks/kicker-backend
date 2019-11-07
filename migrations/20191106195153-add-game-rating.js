"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log(Sequelize.INTEGER)
    return queryInterface.createTable("GameRatings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gameId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Games",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      userA1Id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      userA2Id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      userB1Id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      userB2Id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      userA1Rating: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userA2Rating: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userB1Rating: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userB2Rating: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userA1Points: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userA2Points: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userB1Points: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userB2Points: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable("GameRatings");
  }
};
