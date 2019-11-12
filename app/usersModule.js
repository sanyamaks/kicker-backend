const db = require("../models");

async function getUsers() {
  const users = await db.User.findAll();
  return users;
}

async function isAdmin(userId) {
  const user = await db.User.findById(userId);
  // @todo: Create user access permissions system
  return user.email === process.env.ADMIN_EMAIL;
}

async function updateUser(userId, payload) {
  const user = await db.User.findById(userId);
  if (user) {
    await user.update(payload);
  }
  return user;
}

module.exports = {
  getUsers,
  updateUser,
  isAdmin
};
