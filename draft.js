//Everything is in this file. This file can be executed and the qury results will be showcased in the console.
//This file can be ignored as this was created before giving the project a folder structure and was used as the first draft.2

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    database: "IPL",
  },
});

// Number of matches played per year for all the years in IPL.
knex("matches")
  .select("season")
  .count("* as matches played")
  .groupBy("season")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    knex.destroy();
  });

// Number of matches won per team per year in IPL.
knex("matches")
  .select("season", "winner AS team")
  .count("* as matches_won")
  .groupBy("season", "winner")

  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    knex.destroy();
  });

// Extra runs conceded per team in the year 2016
knex("deliveries AS d")
  .select(
    "d.bowling_team",
    knex.raw("SUM(d.extra_runs) AS extra_runs_conceded")
  )
  .join("matches", "d.match_id", "=", " matches.id")
  .where("matches.season", "=", "2016")
  .groupBy("d.bowling_team")

  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    knex.destroy();
  });

// Top 10 economical bowlers in the year 2015
knex("deliveries")
  .select(
    "bowler",
    knex.raw("ROUND(SUM(total_runs)/(COUNT(*)/6),2) AS economy")
  )
  .join("matches", "deliveries.match_id", "=", " matches.id")
  .where("matches.season", "=", "2015")
  .groupBy("bowler")
  .orderBy("economy")
  .limit("10")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    knex.destroy();
  });

// Find the number of times each team won the toss and also won the match
const query5 = knex("matches")
  .select("winner AS team")
  .whereRaw("toss_winner=winner");

knex
  .select("team", knex.raw("COUNT(*) AS toss_and_match_wins"))
  .from(query5.as("toss_and_match"))
  .groupBy("team")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    knex.destroy();
  });

// Find a player who has won the highest number of Player of the Match awards for each season
knex
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
  .orderBy("season")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    knex.destroy();
  });

// Find the strike rate of a batsman for each season
knex("deliveries as d")
  .select(
    "m.season",
    "d.batsman",
    knex.raw(
      "ROUND(SUM(d.batsman_runs)* 100.0 / COUNT(d.ball),2) AS strike_rate"
    )
  )
  .join(knex.raw("matches as m ON d.match_id=m.id"))
  .where("d.batsman", "=", "V Kohli")
  .groupBy("m.season")
  .groupBy("d.batsman")
  .orderBy("m.season")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    knex.destroy();
  });

// Find the highest number of times one player has been dismissed by another player
knex("deliveries")
  .select("player_dismissed", "bowler", knex.raw("COUNT(*) AS dismissal_count"))
  .whereRaw("player_dismissed != ''")
  .groupBy("player_dismissed")
  .groupBy("bowler")
  .orderBy("dismissal_count", "DESC")
  .limit(1)
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    knex.destroy();
  });

// Find the bowler with the best economy in super overs
knex("deliveries")
  .select(
    "bowler",
    knex.raw("ROUND(SUM(total_runs)/(COUNT(*)/6),2) AS economy")
  )
  .where("is_super_over", "=", "1")
  .groupBy("bowler")
  .orderBy("economy")
  .limit(1)
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    knex.destroy();
  });
