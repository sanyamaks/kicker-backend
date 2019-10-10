"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define(
    "Tournament",
    {
      title: DataTypes.STRING,
      status: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id"
        }
      }
    },
    {}
  );
  Tournament.associate = function({
    User,
    Team,
    TournamentTeam,
    TournamentGame
  }) {
    Tournament.belongsTo(User);
    Tournament.belongsToMany(Team, {
      through: TournamentTeam
    });
    Tournament.hasMany(TournamentGame);
  };
  return Tournament;
};
