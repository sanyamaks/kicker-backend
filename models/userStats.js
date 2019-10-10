"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserStats = sequelize.define(
    "UserStats",
    {
      name: DataTypes.STRING,
      photoUrl: DataTypes.STRING,
      wins: DataTypes.INTEGER,
      defeats: DataTypes.INTEGER,
      goals: DataTypes.INTEGER,
      games: DataTypes.INTEGER,
      rating: DataTypes.INTEGER
    },
    {}
  );
  return UserStats;
};
