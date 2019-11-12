const Router = require("koa-router");
const usersModule = require("../app/usersModule");

const apiUsersRouter = new Router();

apiUsersRouter
  .get("/api/user", async ctx => {
    const user = ctx.state.user || null;
    ctx.body = { user };
  })
  .get("/api/users", async ctx => {
    const users = await usersModule.getUsers();
    ctx.body = { users };
  });

module.exports = apiUsersRouter;
