"use strict";
module.exports = (sequelize, DataTypes) => {
  const GamePlayer = sequelize.define(
    "GamePlayer",
    {
      team: DataTypes.INTEGER,
      position: DataTypes.INTEGER
    },
    {}
  );
  GamePlayer.associate = function({ Game, User }) {
    GamePlayer.belongsTo(User);
    GamePlayer.belongsTo(Game);
  };
  return GamePlayer;
};
