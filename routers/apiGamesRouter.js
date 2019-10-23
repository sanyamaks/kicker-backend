const Router = require("koa-router");
const gamesModule = require("../app/gamesModule");

const apiGamesRouter = new Router();

apiGamesRouter
  .get("/api/games", async ctx => {
    const games = await gamesModule.getGames(ctx.request.query.date);
    ctx.body = { games };
  })
  .get("/api/game/:gameId", async function getGames(ctx) {
    const { gameId } = ctx.params;
    const game = await gamesModule.getGame(gameId);
    ctx.body = { game };
  })
  .post("/api/game", async ctx => {
    const game = await gamesModule.addGame(ctx.request.body);
    ctx.body = { game };
  })
  .delete("/api/game", async ctx => {
    await gamesModule.removeGame({ userId, gameId });
    ctx.body = { success: true };
  })
  .delete("/api/games/:gameId", async ctx => {
    try {
      const { gameId } = ctx.params;
      await gamesModule.deleteGame(gameId);
      ctx.body = { success: true };
    } catch (err) {
      ctx.throw(400, "something went wrong");
    }
  })
  .post("/api/game/join", async ctx => {
    // const { id: userId } = ctx.state.user;
    // const { gameId, team } = ctx.request.body;
    const { gameId, userId, team, position } = ctx.request.body;
    await gamesModule.joinGame({ userId, gameId, team, position });
    ctx.body = { success: true };
  })
  .post("/api/game/left", async ctx => {
    // const { id: userId } = ctx.state.user;
    // const { gameId } = ctx.request.body;
    const { gameId, userId } = ctx.request.body;
    await gamesModule.leftGame({ userId, gameId });
    ctx.body = { success: true };
  })
  .post("/api/game/start", async ctx => {
    const { gameId } = ctx.request.body;
    await gamesModule.startGame({ gameId });
    ctx.body = { success: true };
  })
  .post("/api/game/finish", async ctx => {
    const { gameId } = ctx.request.body;
    await gamesModule.finishGame({ gameId });
    ctx.body = { success: true };
  })
  .post("/api/game/goal", async ctx => {
    // const { id: userId } = ctx.state.user;
    // const { gameId, ownGoal } = ctx.request.body;
    const { gameId, ownGoal, userId } = ctx.request.body;
    const goal = await gamesModule.addGoal({ userId, gameId, ownGoal });
    ctx.body = { goal };
  })
  .delete("/api/game/goal", async ctx => {
    const { goalId } = ctx.request.body;
    await gamesModule.removeGoal({ goalId });
    ctx.body = { success: true };
  });

module.exports = apiGamesRouter;
