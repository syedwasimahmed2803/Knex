const knex = require("../knexConfig");

function getHighestPlayerOfTheMatchAwards() {
  return knex
    .select("season", "player_of_match")
    .count("* as num_awards")
    .from("matches")
    .groupBy("season", "player_of_match")
    .having(knex.raw("COUNT(*)"), "=", function () {
      this.select(knex.raw("COUNT(*)"))
        .from("matches as m2")
        .whereRaw("m2.season = matches.season")
        .groupBy("player_of_match")
        .orderBy(knex.raw("COUNT(*)"), "DESC")
        .limit(1);
    })
    .orderBy("season");
}

module.exports = getHighestPlayerOfTheMatchAwards;
