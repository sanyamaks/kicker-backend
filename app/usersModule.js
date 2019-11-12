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

async function createUserByExternalId(externalId, payload) {
  const existingUser = await db.User.findOne({ where: { externalId } });
  if (existingUser) {
    return existingUser;
  }

  const user = await db.User.create({ externalId, ...payload });
  return await db.User.findById(user.id);
}

module.exports = {
  getUsers,
  isAdmin,
  createUserByExternalId
};
