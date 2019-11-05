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
  })
  .post("/api/users/:userId", async ctx => {
    const { userId } = ctx.params;
    const user = await usersModule.updateUser(userId, ctx.request.body);
    ctx.body = { user };
  })
  .post("/404fest/api/user", async ctx => {
    const { externalId, name } = ctx.request.body;
    const user = await usersModule.createUserByExternalId(externalId, { name });
    ctx.body = { user };
  });

module.exports = apiUsersRouter;
