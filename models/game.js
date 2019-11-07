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
  Game.associate = function({ User, GamePlayer, Goal, GameRating }) {
    Game.belongsToMany(User, { through: GamePlayer });
    Game.Goals = Game.hasMany(Goal);
    Game.GamePlayers = Game.hasMany(GamePlayer);
    Game.GameRating = Game.hasOne(GameRating);
  };
  return Game;
};
