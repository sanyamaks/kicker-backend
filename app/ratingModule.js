// const moment = require("moment");
// const db = require("../models");
const elo = require("../services/elo");

async function addGame(game) {
  const gameId = game.id;
  const users = game["Users"].map(el => el);
  const usersAId = users
    .filter(user => user.GamePlayer.team === 0)
    .map(el => el.id);
  const usersBId = users
    .filter(user => user.GamePlayer.team === 1)
    .map(el => el.id);

  const usersARating = users
    .filter(user => user.GamePlayer.team === 0)
    .map(el => el.rating);
  const usersBRating = users
    .filter(user => user.GamePlayer.team === 1)
    .map(el => el.rating);

  const goals = game["Goals"].map(el => [
    {
      UserId: el["UserId"],
      ownGoal: el["ownGoal"]
    }
  ]);

  const gameRating = await distributeUserPoints(
    elo.elo(usersARating, usersBRating, isVictoryTeamA(goals, usersAId, usersBId)),
    usersAId,
    usersBId
  );
  const [userA1Id, userA2Id] = usersAId;
  const [userB1Id, userB2Id] = usersBId;
  const [userA1Rating, userA2Rating] = usersARating;
  const [userB1Rating, userB2Rating] = usersBRating;
  const { userA1Points, userA2Points, userB1Points, userB2Points } = gameRating;

  return {
    gameId,
    userA1Id,
    userA2Id,
    userB1Id,
    userB2Id,
    userA1Rating,
    userA2Rating,
    userB1Rating,
    userB2Rating,
    userA1Points,
    userA2Points,
    userB1Points,
    userB2Points
  };

  function distributeUserPoints(usersPoints, usersAId, usersBId) {
    const { teamAPoints, teamBPoints } = usersPoints;
    const numberUsersA = usersAId.length;
    const numberUsersB = usersBId.length;

    const userA1Points = (teamAPoints / numberUsersA).toFixed(0);
    const userA2Points = (teamAPoints / numberUsersA).toFixed(0);
    const userB1Points = (teamBPoints / numberUsersB).toFixed(0);
    const userB2Points = (teamBPoints / numberUsersB).toFixed(0);

    return { userA1Points, userA2Points, userB1Points, userB2Points };
  }

  function isVictoryTeamA(goals, usersAId, usersBId) {
    const [userA1Id, userA2Id] = usersAId;
    const [userB1Id, userB2Id] = usersBId;

    let scoredTeamA = goals.filter(el => {
        const UserId = el[0]["UserId"];
        const ownGoal = el[0]["ownGoal"];
        return (
          ((UserId === userA1Id || UserId === userA2Id) && !ownGoal) ||
          ((UserId === userB1Id || UserId === userB2Id) && ownGoal)
        );
      }),
      scoredTeamB = goals.filter(el => {
        const UserId = el[0]["UserId"];
        const ownGoal = el[0]["ownGoal"];
        return (
          ((UserId === userB1Id || UserId === userB2Id) && !ownGoal) ||
          ((UserId === userA1Id || UserId === userA2Id) && ownGoal)
        );
      });
    return scoredTeamA > scoredTeamB;
  }
}

module.exports = {
  addGame
};
