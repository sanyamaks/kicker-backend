const arrayGames = require("./games");

arrayGames["games"].map(function(el) {
  elo(
    el["Users"].map(el => el["rating"]),
    findOutWinner(
      el["Goals"].map(el => [
        {
          UserId: el["UserId"],
          ownGoal: el["ownGoal"]
        }
      ]),
      el["Users"].map(el => el["id"])
    )
  );
});

function findOutWinner(goals, userId) {
  // console.log(goals);
  // console.log(userId);
  let id1TeamA = userId[0],
    id2TeamA = userId[1],
    id1TeamB = userId[2],
    id2TeamB = userId[3];

  let scoredTeamA = goals.filter(
      el =>
        ((el[0]["UserId"] === id1TeamA || el[0]["UserId"] === id2TeamA) &&
          !el[0]["ownGoal"]) ||
        ((el[0]["UserId"] === id1TeamB || el[0]["UserId"] === id2TeamB) &&
          el[0]["ownGoal"])
    ),
    scoredTeamB = goals.filter(
      el =>
        ((el[0]["UserId"] === id1TeamB || el[0]["UserId"] === id2TeamB) &&
          !el[0]["ownGoal"]) ||
        ((el[0]["UserId"] === id1TeamA || el[0]["UserId"] === id2TeamA) &&
          el[0]["ownGoal"])
    );
  // console.log(scoredTeamA.length, scoredTeamB.length);
  // console.log(scoredTeamA > scoredTeamB);
  return scoredTeamA > scoredTeamB;
}

function elo(rating, isVictoryTeamA) {
  const MAXIMUM_POINTS = 16;

  let rating1TeamA = rating[0],
    rating2TeamA = rating[1],
    rating1TeamB = rating[2],
    rating2TeamB = rating[3];

  let ratingTeamA = rating1TeamA + rating2TeamA,
    ratingTeamB = rating1TeamB + rating2TeamB;

  let actualPoints = isVictoryTeamA ? 1 : 0;
  // console.log(actualPoints);

  let expectedPoints = (
    1 /
    (1 + Math.pow(10, (ratingTeamB - ratingTeamA) / 400))
  ).toFixed(2);

  let newRatingTeamA =
    ratingTeamA + MAXIMUM_POINTS * (actualPoints - expectedPoints);

  let deltaA = newRatingTeamA - ratingTeamA;
  // console.log(deltaA);

  let newRating1TeamA = rating1TeamA + deltaA / 2,
    newRating2TeamA = rating2TeamA + deltaA / 2,
    newRating1TeamB = rating1TeamB - deltaA / 2,
    newRating2TeamB = rating2TeamB - deltaA / 2;
  // console.log({newRating1TeamA, newRating2TeamA, newRating1TeamB, newRating2TeamB});

  return { newRating1TeamA, newRating2TeamA, newRating1TeamB, newRating2TeamB };
}
