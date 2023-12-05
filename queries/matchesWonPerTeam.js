const knex = require("../knexConfig");

function getMatchesWonPerTeam() {
  return knex("matches")
    .select("season", "winner AS team")
    .count("* as matches_won")
    .groupBy("season", "winner");
}

module.exports = getMatchesWonPerTeam;
