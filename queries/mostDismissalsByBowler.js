const knex = require("../knexConfig");

function getMostDismissalsByBowler() {
  return knex("deliveries")
    .select(
      "player_dismissed",
      "bowler",
      knex.raw("COUNT(*) AS dismissal_count")
    )
    .whereRaw("player_dismissed != ''")
    .groupBy("player_dismissed")
    .groupBy("bowler")
    .orderBy("dismissal_count", "DESC")
    .limit(1);
}

module.exports = getMostDismissalsByBowler;
