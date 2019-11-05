function calculatePoints({ player1, player2 }) {
  // https://ru.wikipedia.org/wiki/%D0%A0%D0%B5%D0%B9%D1%82%D0%B8%D0%BD%D0%B3_%D0%AD%D0%BB%D0%BE
  // https://habr.com/ru/post/308920/
  const MAXIMUM_POINTS = 16;

  const player1ActualResult = player1.score > player2.score ? 1 : 0;

  const player1ExpectedResult =
    Math.round(
      (1 / (1 + 10 ** ((player2.rating - player1.rating) / 400))) * 100
    ) / 100;

  const player1Points =
    MAXIMUM_POINTS * (player1ActualResult - player1ExpectedResult);
  const player2Points = -player1Points;

  return {
    player1Points,
    player2Points
  };
}

module.exports = {
  calculatePoints
};
