function elo(teamARating, teamBRating, isVictoryTeamA) {
  // https://ru.wikipedia.org/wiki/%D0%A0%D0%B5%D0%B9%D1%82%D0%B8%D0%BD%D0%B3_%D0%AD%D0%BB%D0%BE
  // https://habr.com/ru/post/308920/
  const MAXIMUM_POINTS = 16;

  const ratingTeamA = teamARating.reduce(function(sum, current) {
    return sum + current;
  }, 0);
  const ratingTeamB = teamBRating.reduce(function(sum, current) {
    return sum + current;
  }, 0);

  let actualPoints = isVictoryTeamA ? 1 : 0;

  let expectedPoints = (
    1 /
    (1 + 10 ** ((ratingTeamB - ratingTeamA) / 400))
  ).toFixed(2);

  let delta = MAXIMUM_POINTS * (actualPoints - expectedPoints);

  let teamAPoints = delta;
  let teamBPoints = +-delta;

  return {
    teamAPoints,
    teamBPoints
  };
}

module.exports = {
  elo
};