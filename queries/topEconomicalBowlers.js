const knex = require("../knexConfig");

function getTopEconomicalBowlers(year) {
  return knex("deliveries")
    .select(
      "bowler",
      knex.raw("ROUND(SUM(total_runs)/(COUNT(*)/6),2) AS economy")
    )
    .join("matches", "deliveries.match_id", "=", "matches.id")
    .where("matches.season", "=", year)
    .groupBy("bowler")
    .orderBy("economy")
    .limit(10);
}

module.exports = getTopEconomicalBowlers;
