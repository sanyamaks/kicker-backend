"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      photoUrl: DataTypes.STRING,
      email: DataTypes.STRING,
      externalId: DataTypes.STRING
    },
    {}
  );
  User.associate = function({ Game, GamePlayer, Goal }) {
    User.belongsToMany(Game, { through: GamePlayer });
    User.hasMany(Goal);
  };
  return User;
};
