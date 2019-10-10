const passport = require("koa-passport");
const Router = require("koa-router");

const authModule = require("../app/authModule");

authModule.initPassportStrategies();

const authRouter = new Router();

authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get("/auth/google/callback", ctx => {
  return passport.authenticate("google", (err, user) => {
    if (user === false) {
      ctx.throw(401);
    } else {
      ctx.login(user);
      ctx.redirect("/app");
    }
  })(ctx);
});

authRouter.post("/auth/logout", ctx => {
  ctx.logout();
  ctx.redirect("/");
});

module.exports = authRouter;
