function calculatePoints({ player1, player2 }) {
  // https://ru.wikipedia.org/wiki/%D0%A0%D0%B5%D0%B9%D1%82%D0%B8%D0%BD%D0%B3_%D0%AD%D0%BB%D0%BE
  // https://habr.com/ru/post/308920/
  const MAXIMUM_POINTS = 16;

  const actualPoints = player1.score > player2.score ? 1 : 0;

  const expectedPoints = (
    1 /
    (1 + 10 ** ((player2.rating - player1.rating) / 400))
  ).toFixed(2);

  const delta = MAXIMUM_POINTS * (actualPoints - expectedPoints);

  const player1Points = delta;
  const player2Points = +-delta;

  return {
    player1Points,
    player2Points
  };
}

module.exports = {
  calculatePoints
};
