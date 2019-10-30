// const moment = require("moment");
// const db = require("../models");

async function countPoints(game) {
  const gameId = game.id,
    usersId = game["Users"].map(el => el.id),
    usersRating = game["Users"].map(el => el["rating"]),
    goals = game["Goals"].map(el => [
      {
        UserId: el["UserId"],
        ownGoal: el["ownGoal"]
      }
    ]);
  const gameRating = await elo(
    gameId,
    usersId,
    usersRating,
    findOutWinner(goals, usersId)
  );
  return gameRating;

  function findOutWinner(goals, usersId) {
    let userA1Id = usersId[0],
      userA2Id = usersId[1],
      userB1Id = usersId[2],
      userB2Id = usersId[3];

    let scoredTeamA = goals.filter(
        el =>
          ((el[0]["UserId"] === userA1Id || el[0]["UserId"] === userA2Id) &&
            !el[0]["ownGoal"]) ||
          ((el[0]["UserId"] === userB1Id || el[0]["UserId"] === userB2Id) &&
            el[0]["ownGoal"])
      ),
      scoredTeamB = goals.filter(
        el =>
          ((el[0]["UserId"] === userB1Id || el[0]["UserId"] === userB2Id) &&
            !el[0]["ownGoal"]) ||
          ((el[0]["UserId"] === userA1Id || el[0]["UserId"] === userA2Id) &&
            el[0]["ownGoal"])
      );
    return scoredTeamA > scoredTeamB;
  }

  function elo(gameId, usersId, usersRating, isVictoryTeamA) {
    const MAXIMUM_POINTS = 16;

    let userA1Id = usersId[0],
      userA2Id = usersId[1],
      userB1Id = usersId[2],
      userB2Id = usersId[3];

    let userA1Rating = usersRating[0],
      userA2Rating = usersRating[1],
      userB1Rating = usersRating[2],
      userB2Rating = usersRating[3];

    let ratingTeamA = userA1Rating + userA2Rating,
      ratingTeamB = userB1Rating + userB2Rating;

    let actualPoints = isVictoryTeamA ? 1 : 0;

    let expectedPoints = (
      1 /
      (1 + 10 ** ((ratingTeamB - ratingTeamA) / 400))
    ).toFixed(2);

    let newRatingTeamA =
      ratingTeamA + MAXIMUM_POINTS * (actualPoints - expectedPoints);

    let deltaA = newRatingTeamA - ratingTeamA;

    let userA1Points = +(deltaA / 2).toFixed(0),
      userA2Points = +(deltaA / 2).toFixed(0),
      userB1Points = +(-deltaA / 2).toFixed(0),
      userB2Points = +(-deltaA / 2).toFixed(0);

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
  }
}

module.exports = {
  countPoints
};
