"use strict";
module.exports = (sequelize, DataTypes) => {
  const TournamentGame = sequelize.define(
    "TournamentGame",
    {
      tournamentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Tournament",
          key: "id"
        }
      },
      team1Id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Team",
          key: "id"
        }
      },
      team2Id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Team",
          key: "id"
        }
      }
    },
    {}
  );
  TournamentGame.associate = function({ Team, Game, Tournament }) {
    TournamentGame.belongsTo(Team, { as: "team1" });
    TournamentGame.belongsTo(Team, { as: "team2" });
    TournamentGame.belongsToMany(Game, { through: "TournamentGamesGames" });
    TournamentGame.belongsTo(Tournament);
  };
  return TournamentGame;
};
