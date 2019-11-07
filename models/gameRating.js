"use strict";
module.exports = (sequelize, DataTypes) => {
  const GameRating = sequelize.define(
    "GameRating",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      gameId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Games",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      userA1Id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      userA2Id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      userB1Id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      userB2Id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      userA1Rating: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      userA2Rating: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      userB1Rating: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      userB2Rating: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      userA1Points: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      userA2Points: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      userB1Points: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      userB2Points: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {}
  );
  GameRating.associate = function({ Game, User }) {
    GameRating.belongsTo(Game);
  };
  return GameRating;
};
