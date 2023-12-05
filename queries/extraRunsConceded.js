const knex = require("../knexConfig");

function getExtraRunsConceded() {
  return knex("deliveries AS d")
    .select(
      "d.bowling_team",
      knex.raw("SUM(d.extra_runs) AS extra_runs_conceded")
    )
    .join("matches", "d.match_id", "=", "matches.id")
    .where("matches.season", "=", "2016")
    .groupBy("d.bowling_team");
}

module.exports = getExtraRunsConceded;
