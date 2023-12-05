const knex = require("../knexConfig");

function getTossAndMatchWins() {
  const query = knex("matches")
    .select("winner AS team")
    .whereRaw("toss_winner=winner");

  return knex
    .select("team", knex.raw("COUNT(*) AS toss_and_match_wins"))
    .from(query.as("toss_and_match"))
    .groupBy("team");
}

module.exports = getTossAndMatchWins;
