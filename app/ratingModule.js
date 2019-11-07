// const moment = require("moment");
// const db = require("../models");
const elo = require("../services/elo");

const TEAM_A = 0;
const TEAM_B = 1;

async function addGame(game) {
  const usersByTeam = {
    [TEAM_A]: game.Users.filter(user => user.GamePlayer.team === TEAM_A),
    [TEAM_B]: game.Users.filter(user => user.GamePlayer.team === TEAM_B)
  };
  const usersIdsByTeam = {
    [TEAM_A]: usersByTeam[TEAM_A].map(user => user.id),
    [TEAM_B]: usersByTeam[TEAM_B].map(user => user.id)
  };

  const scoreByTeam = {
    [TEAM_A]: game.Goals.filter(
      goal =>
        (usersIdsByTeam[TEAM_A].includes(goal.UserId) && !goal.ownGoal) ||
        (!usersIdsByTeam[TEAM_A].includes(goal.UserId) && goal.ownGoal)
    ),
    [TEAM_B]: game.Goals.filter(
      goal =>
        (usersIdsByTeam[TEAM_B].includes(goal.UserId) && !goal.ownGoal) ||
        (!usersIdsByTeam[TEAM_B].includes(goal.UserId) && goal.ownGoal)
    )
  };

  const ratingByTeam = {
    [TEAM_A]: usersByTeam[TEAM_A][0].rating + usersByTeam[TEAM_A][1].rating,
    [TEAM_B]: usersByTeam[TEAM_B][0].rating + usersByTeam[TEAM_B][1].rating
  };

  const {
    player1Points: eloPlayer1Points,
    player2Points: eloPlayer2Points
  } = elo.calculatePoints({
    player1: {
      rating: ratingByTeam[TEAM_A],
      score: scoreByTeam[TEAM_A]
    },
    player2: {
      rating: ratingByTeam[TEAM_B],
      score: scoreByTeam[TEAM_B]
    }
  });

  return {
    gameId: game.id,
    userA1Id: usersByTeam[TEAM_A][0].id,
    userA2Id: usersByTeam[TEAM_A][1].id,
    userB1Id: usersByTeam[TEAM_B][0].id,
    userB2Id: usersByTeam[TEAM_B][1].id,
    userA1Rating: scoreByTeam[TEAM_A][0].rating,
    userA2Rating: scoreByTeam[TEAM_A][1].rating,
    userB1Rating: scoreByTeam[TEAM_B][0].rating,
    userB2Rating: scoreByTeam[TEAM_B][1].rating,
    userA1Points: eloPlayer1Points / 2,
    userA2Points: eloPlayer1Points / 2,
    userB1Points: eloPlayer2Points / 2,
    userB2Points: eloPlayer2Points / 2
  };
}

module.exports = {
  addGame
};
