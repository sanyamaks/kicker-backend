const Router = require("koa-router");
const authModule = require("../app/authModule");

const apiProfileRouter = new Router();

apiProfileRouter.get("/api/me", authModule.authenticatedOnly, function(ctx) {
  const user = ctx.state.user ? ctx.state.user : null;
  ctx.body = { data: user };
});

module.exports = apiProfileRouter;
