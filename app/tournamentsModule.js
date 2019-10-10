const moment = require("moment");
const db = require("../models");

const { Op } = db.Sequelize;

async function createTournament(params) {
  const { id } = await db.Tournament.create(params);
  const tournament = await db.Tournament.findById(id, {
    include: [{ model: db.User }]
  });
  return tournament;
}

async function updateTournament() {}
async function deleteTournament() {}

async function getTournaments() {
  const tournaments = await db.Tournament.findAll({
    include: [
      {
        model: db.TournamentGame,
        include: [
          {
            model: db.Team,
            as: "team1",
            include: [
              { model: db.User, as: "player1" },
              { model: db.User, as: "player2" }
            ]
          },
          {
            model: db.Team,
            as: "team2",
            include: [
              { model: db.User, as: "player1" },
              { model: db.User, as: "player2" }
            ]
          }
        ]
      }
    ],
    order: [["createdAt", "DESC"]]
  });
  return tournaments;
}

async function getTournament(tournamentId) {
  const tournament = await db.Tournament.findById(tournamentId);
  return tournament;
}

async function getTournamentTeams(tournamentId) {
  const tournament = await db.Tournament.findById(tournamentId);
  return await tournament.getTeams({
    include: [
      { model: db.User, as: "player1" },
      { model: db.User, as: "player2" }
    ]
  });
}

async function getTournamentGames(tournamentId) {
  const tournament = await db.Tournament.findById(tournamentId);
  return await tournament.getTournamentGames({
    include: [
      {
        model: db.Game,
        include: [{ model: db.User }, { model: db.Goal }]
      },
      {
        model: db.Team,
        as: "team1",
        include: [
          { model: db.User, as: "player1" },
          { model: db.User, as: "player2" }
        ]
      },
      {
        model: db.Team,
        as: "team2",
        include: [
          { model: db.User, as: "player1" },
          { model: db.User, as: "player2" }
        ]
      }
    ]
  });
}

async function getGames(tournamentId) {
  const tournament = await db.Tournament.findById(tournamentId);
  const tournamentGames = await tournament.getTournamentGames({
    include: [
      {
        model: db.Game
      }
    ]
  });

  return tournamentGames
    .map(tournamentGame => tournamentGame.Games)
    .reduce((result, item) => result.concat(item), []);
}

async function getLastTournament() {
  const tournament = await db.Tournament.findOne({
    order: [["startDate", "DESC"]]
  });
  return tournament;
}

async function linkTeam({ tournamentId, teamId }) {
  const tournament = await db.Tournament.findById(tournamentId);
  const team = await db.Team.findById(teamId);
  if (tournament && team) {
    await tournament.addTeam(team);
  }
}

async function unlinkTeam({ tournamentId, teamId }) {
  const tournament = await db.Tournament.findById(tournamentId);
  const team = await db.Team.findById(teamId);
  if (tournament && team) {
    await tournament.removeTeam(team);
  }
}

async function createTournamentGames(tournamentId) {
  const tournament = await db.Tournament.findById(tournamentId, {
    include: [{ model: db.Team }]
  });

  const tournamentGames = [];
  const teams = tournament.Teams.slice();
  while (teams.length > 0) {
    const team1 = teams.pop();
    teams.forEach(team2 => {
      tournamentGames.push({
        team1Id: team1.id,
        team2Id: team2.id,
        tournamentId
      });
    });
  }

  await db.TournamentGame.bulkCreate(tournamentGames);
}

async function linkGame({ tournamentGameId, gameId }) {
  const tournamentGame = await db.TournamentGame.findById(tournamentGameId);
  const game = await db.Game.findById(gameId);

  if (tournamentGame && game) {
    tournamentGame.addGame(game);
  }
}

async function unlinkGame({ tournamentGameId, gameId }) {
  const tournamentGame = await db.TournamentGame.findById(tournamentGameId);
  const game = await db.Game.findById(gameId);

  if (tournamentGame && game) {
    tournamentGame.removeGame(game);
  }
}

function getGamesResultsQuery() {
  return `
    SELECT
      TournamentGames.id AS tournamentGameId,
      TournamentGames.team1Id,
      TournamentGames.team2Id,
      Games.id AS gameId,
      TeamsRed.id AS teamIdRed,
      TeamsBlue.id AS teamIdBlue,
      CAST(
        SUM(
          CASE
            WHEN GamePlayers.team = 0 AND Goals.ownGoal = 0 THEN 1
            WHEN GamePlayers.team = 1 AND Goals.ownGoal = 1 THEN 1
            ELSE 0
          END
        ) AS UNSIGNED
      ) AS goalsRed,
      CAST(
        SUM(
          CASE
            WHEN GamePlayers.team = 1 AND Goals.ownGoal = 0 THEN 1
            WHEN GamePlayers.team = 0 AND Goals.ownGoal = 1 THEN 1
            ELSE 0
          END
        ) AS UNSIGNED
      ) AS goalsBlue
    FROM TournamentGames
      LEFT JOIN TournamentGamesGames
        ON TournamentGamesGames.tournamentGameId = TournamentGames.id
      LEFT JOIN Games
        ON TournamentGamesGames.gameId = Games.id
      LEFT JOIN Goals
        ON Games.id = Goals.gameId
      
      LEFT JOIN GamePlayers
        ON Goals.gameId = GamePlayers.gameId
        AND Goals.userId = GamePlayers.userId
      
      LEFT JOIN GamePlayers AS GamePlayersRedForward
        ON Games.id = GamePlayersRedForward.gameId
        AND GamePlayersRedForward.team = 0
        AND GamePlayersRedForward.position = 0
      
      LEFT JOIN GamePlayers AS GamePlayersRedDefender
        ON Games.id = GamePlayersRedDefender.gameId
        AND GamePlayersRedDefender.team = 0
        AND GamePlayersRedDefender.position = 1
      
      LEFT JOIN GamePlayers AS GamePlayersBlueForward
        ON Games.id = GamePlayersBlueForward.gameId
        AND GamePlayersBlueForward.team = 1
        AND GamePlayersBlueForward.position = 0
      
      LEFT JOIN GamePlayers AS GamePlayersBlueDefender
        ON Games.id = GamePlayersBlueDefender.gameId
        AND GamePlayersBlueDefender.team = 1
        AND GamePlayersBlueDefender.position = 1
      
      LEFT JOIN Teams AS TeamsRed
        ON TeamsRed.id IN (TournamentGames.team1Id, TournamentGames.team2Id)
        AND TeamsRed.player1Id IN (GamePlayersRedDefender.userId, GamePlayersRedForward.userId)
        AND TeamsRed.player2Id IN (GamePlayersRedDefender.userId, GamePlayersRedForward.userId)
      
      LEFT JOIN Teams AS TeamsBlue
        ON TeamsBlue.id IN (TournamentGames.team1Id, TournamentGames.team2Id)
        AND TeamsBlue.player1Id IN (GamePlayersBlueDefender.userId, GamePlayersBlueForward.userId)
        AND TeamsBlue.player2Id IN (GamePlayersBlueDefender.userId, GamePlayersBlueForward.userId)
    WHERE TournamentGames.tournamentId = :tournamentId
    GROUP BY
      TournamentGames.id,
      TournamentGames.team1Id,
      TournamentGames.team2Id,
      Games.id,
      TeamsRed.id,
      TeamsBlue.id
  `;
}

async function getGamesResults(tournamentId) {
  const gamesResults = await db.sequelize.query(getGamesResultsQuery(), {
    type: db.sequelize.QueryTypes.SELECT,
    replacements: { tournamentId }
  });
  const teamsIds = [
    ...gamesResults.map(gamesResult => gamesResult.team1Id),
    ...gamesResults.map(gamesResult => gamesResult.team2Id)
  ];
  const teams = await db.Team.findAll({
    where: {
      id: {
        [Op.in]: teamsIds
      }
    },
    include: [
      { model: db.User, as: "player1" },
      { model: db.User, as: "player2" }
    ]
  });

  const gamesIds = gamesResults.map(gamesResult => gamesResult.gameId);
  const games = await db.Game.findAll({
    where: {
      id: {
        [Op.in]: gamesIds
      }
    },
    include: [{ model: db.User }, { model: db.Goal }]
  });

  return gamesResults.map(gamesResult => ({
    ...gamesResult,
    game: games.find(game => game.id === gamesResult.gameId),
    team1: teams.find(team => team.id === gamesResult.team1Id),
    team2: teams.find(team => team.id === gamesResult.team2Id),
    teamRed: teams.find(team => team.id === gamesResult.teamIdRed),
    teamBlue: teams.find(team => team.id === gamesResult.teamIdBlue)
  }));
}

function getStatsQuery() {
  return `
    SELECT
      Teams.id as teamId,
      COUNT(TournamentGameResults.gameId) AS games,
      CAST(
        SUM(
          CASE
            WHEN Teams.id = TournamentGameResults.teamIdRed AND TournamentGameResults.goalsRed > TournamentGameResults.goalsBlue THEN 1
            WHEN Teams.id = TournamentGameResults.teamIdBlue AND TournamentGameResults.goalsBlue > TournamentGameResults.goalsRed THEN 1
            ELSE 0
          END
        ) AS UNSIGNED
      ) AS wins,
      CAST(
        SUM(
          CASE
            WHEN Teams.id = TournamentGameResults.teamIdRed AND TournamentGameResults.goalsRed < TournamentGameResults.goalsBlue THEN 1
            WHEN Teams.id = TournamentGameResults.teamIdBlue AND TournamentGameResults.goalsBlue < TournamentGameResults.goalsRed THEN 1
            ELSE 0
          END
        ) AS UNSIGNED
      ) AS defeats,
      CAST(
        SUM(
          CASE
            WHEN Teams.id = TournamentGameResults.teamIdRed THEN TournamentGameResults.goalsRed
            WHEN Teams.id = TournamentGameResults.teamIdBlue THEN TournamentGameResults.goalsBlue
            ELSE 0
          END
        ) AS UNSIGNED
      ) AS goalsScored,
      CAST(
        SUM(
          CASE
            WHEN Teams.id = TournamentGameResults.teamIdRed THEN TournamentGameResults.goalsBlue
            WHEN Teams.id = TournamentGameResults.teamIdBlue THEN TournamentGameResults.goalsRed
            ELSE 0
          END
        ) AS UNSIGNED
      ) AS goalsMissed
    FROM TournamentTeams
    INNER JOIN Teams ON TournamentTeams.teamId = Teams.id
      AND TournamentTeams.tournamentId = :tournamentId
    LEFT JOIN (${getGamesResultsQuery()}) AS TournamentGameResults
      ON Teams.id IN (TournamentGameResults.team1Id, TournamentGameResults.team2Id)
      AND TournamentGameResults.gameId IS NOT NULL
    GROUP BY Teams.id
  `;
}

async function getStats(tournamentId) {
  const stats = await db.sequelize.query(getStatsQuery(), {
    type: db.sequelize.QueryTypes.SELECT,
    replacements: { tournamentId }
  });
  const teamsIds = stats.map(data => data.teamId);
  const teams = await db.Team.findAll({
    where: {
      id: {
        [Op.in]: teamsIds
      }
    },
    include: [
      { model: db.User, as: "player1" },
      { model: db.User, as: "player2" }
    ]
  });

  return stats.map(data => ({
    ...data,
    team: teams.find(team => team.id === data.teamId)
  }));
}

module.exports = {
  createTournament,
  getTournaments,
  getTournament,
  getTournamentTeams,
  getTournamentGames,
  getLastTournament,
  linkTeam,
  unlinkTeam,
  createTournamentGames,
  linkGame,
  unlinkGame,
  getGamesResults,
  getStats,
  getGames
};
