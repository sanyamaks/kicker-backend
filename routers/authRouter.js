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
    if (user) {
      ctx.login(user);
    }
    ctx.redirect("/auth/google/result");
  })(ctx);
});

authRouter.get("/auth/google/result", ctx => {
  return ctx.render("auth-google-result", {
    isAuthenticated: ctx.isAuthenticated(),
    referrer: process.env.GOOGLE_AUTH_REFERRER
  });
});

authRouter.post("/auth/logout", ctx => {
  ctx.logout();
  ctx.redirect("/");
});

module.exports = authRouter;
