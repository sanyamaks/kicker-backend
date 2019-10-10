const moment = require("moment");
const db = require("../models");

async function createTeam(params) {
  const { id } = await db.Team.create(params);
  const tournament = await db.Team.findById(id, {
    include: [
      { model: db.User, as: "player1" },
      { model: db.User, as: "player2" }
    ]
  });
  return tournament;
}

async function getTeam(id) {
  return await db.Team.findById(id);
}

async function getTeams() {
  const teams = await db.Team.findAll({
    include: [
      { model: db.User, as: "player1" },
      { model: db.User, as: "player2" }
    ]
  });
  return teams;
}

async function updateTeam() {}

async function deleteTeam() {}

module.exports = {
  getTeam,
  createTeam,
  getTeams,
  updateTeam,
  deleteTeam
};
