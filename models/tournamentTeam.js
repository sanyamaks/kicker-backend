"use strict";
module.exports = (sequelize, DataTypes) => {
  var TournamentTeam = sequelize.define(
    "TournamentTeam",
    {
      tournamentId: DataTypes.INTEGER,
      teamId: DataTypes.INTEGER
    },
    {}
  );
  TournamentTeam.associate = function({ Team, Tournament }) {
    TournamentTeam.belongsTo(Team);
    TournamentTeam.belongsTo(Tournament);
  };
  return TournamentTeam;
};
