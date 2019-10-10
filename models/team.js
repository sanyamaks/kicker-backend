"use strict";
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    "Team",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Team.associate = function({ User, Tournament, TournamentTeam }) {
    Team.belongsTo(User, { as: "player1" });
    Team.belongsTo(User, { as: "player2" });
    Team.belongsToMany(Tournament, { through: TournamentTeam });
  };
  return Team;
};
