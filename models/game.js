"use strict";
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    "Game",
    {
      ball: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {}
  );
  Game.associate = function({ User, GamePlayer, Goal }) {
    Game.belongsToMany(User, { through: GamePlayer });
    Game.Goals = Game.hasMany(Goal);
    Game.GamePlayers = Game.hasMany(GamePlayer);
  };
  return Game;
};
