"use strict";
module.exports = (sequelize, DataTypes) => {
  var Goal = sequelize.define(
    "Goal",
    {
      ownGoal: DataTypes.BOOLEAN
    },
    {}
  );
  Goal.associate = function({ User, Game }) {
    Goal.belongsTo(User);
    Goal.belongsTo(Game);
  };
  return Goal;
};
