const knex = require("../knexConfig");

function getMatchesPlayedPerYear() {
  return knex("matches")
    .select("season")
    .count("* as matches_played")
    .groupBy("season");
}

module.exports = getMatchesPlayedPerYear;
