const knex = require("../knexConfig");

function getBestEconomyInSuperOvers() {
  return knex("deliveries")
    .select(
      "bowler",
      knex.raw("ROUND(SUM(total_runs)/(COUNT(*)/6),2) AS economy")
    )
    .where("is_super_over", "=", "1")
    .groupBy("bowler")
    .orderBy("economy")
    .limit(1);
}

module.exports = getBestEconomyInSuperOvers;
