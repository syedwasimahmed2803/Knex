const getMatchesPlayedPerYear = require("./queries/matchesPlayedPerYear");
const getMatchesWonPerTeam = require("./queries/matchesWonPerTeam");
const getExtraRunsConceded = require("./queries/extraRunsConceded");
const getTopEconomicalBowlers = require("./queries/topEconomicalBowlers");
const getTossAndMatchWins = require("./queries/tossAndMatchWins");
const getHighestPlayerOfTheMatchAwards = require("./queries/highestPlayerOfTheMatchAwards");
const getBatsmanStrikeRatePerSeason = require("./queries/batsmanStrikeRatePerSeason");
const getMostDismissalsByBowler = require("./queries/mostDismissalsByBowler");
const getBestEconomyInSuperOvers = require("./queries/bestEconomyInSuperOvers");
const knex = require("knex");

async function runQueries() {
  try {
    // Execute all queries concurrently using Promise.all
    const [
      matchesPlayed,
      matchesWon,
      extraRuns,
      topEconomicalBowlers,
      tossAndMatchWins,
      highestPlayerOfTheMatchAwards,
      batsmanStrikeRate,
      mostDismissals,
      bestEconomyInSuperOvers,
    ] = await Promise.all([
      getMatchesPlayedPerYear(),
      getMatchesWonPerTeam(),
      getExtraRunsConceded(),
      getTopEconomicalBowlers("2015"),
      getTossAndMatchWins(),
      getHighestPlayerOfTheMatchAwards(),
      getBatsmanStrikeRatePerSeason("V Kohli"),
      getMostDismissalsByBowler(),
      getBestEconomyInSuperOvers(),
    ]);

    console.log("Matches Played Per Year:");
    console.log(matchesPlayed);

    console.log("\nMatches Won Per Team Per Year:");
    console.log(matchesWon);

    console.log("\nExtra Runs Conceded Per Team in 2016:");
    console.log(extraRuns);

    console.log("\nTop 10 Economical Bowlers in 2015:");
    console.log(topEconomicalBowlers);

    console.log("\nToss and Match Wins by Each Team:");
    console.log(tossAndMatchWins);

    console.log("\nHighest Player of the Match Awards Per Season:");
    console.log(highestPlayerOfTheMatchAwards);

    console.log("\nBatsman Strike Rate Per Season for V Kohli:");
    console.log(batsmanStrikeRate);

    console.log("\nMost Dismissals by a Bowler:");
    console.log(mostDismissals);

    console.log("\nBowler with the Best Economy in Super Overs:");
    console.log(bestEconomyInSuperOvers);
  } catch (error) {
    console.error(error);
  }
}

// Run the queries
runQueries();
