const getMatchesPlayedPerYear = require("./queries/matchesPlayedPerYear");
const getMatchesWonPerTeam = require("./queries/matchesWonPerTeam");
const getExtraRunsConceded = require("./queries/extraRunsConceded");
const getTopEconomicalBowlers = require("./queries/topEconomicalBowlers");
const getTossAndMatchWins = require("./queries/tossAndMatchWins");
const getHighestPlayerOfTheMatchAwards = require("./queries/highestPlayerOfTheMatchAwards");
const getBatsmanStrikeRatePerSeason = require("./queries/batsmanStrikeRatePerSeason");
const getMostDismissalsByBowler = require("./queries/mostDismissalsByBowler");
const getBestEconomyInSuperOvers = require("./queries/bestEconomyInSuperOvers");

// Execute and console the results
getMatchesPlayedPerYear()
  .then((result) => {
    console.log("Matches Played Per Year:");
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

getMatchesWonPerTeam()
  .then((result) => {
    console.log("Matches Won Per Team Per Year:");
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

getExtraRunsConceded()
  .then((result) => {
    console.log("Extra Runs Conceded Per Team in 2016:");
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

getTopEconomicalBowlers("2015")
  .then((result) => {
    console.log("Top 10 Economical Bowlers in 2015:");
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

getTossAndMatchWins()
  .then((result) => {
    console.log("Toss and Match Wins by Each Team:");
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
getHighestPlayerOfTheMatchAwards()
  .then((result) => {
    console.log("Highest Player of the Match Awards Per Season:");
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

getBatsmanStrikeRatePerSeason("V Kohli")
  .then((result) => {
    console.log("Batsman Strike Rate Per Season for V Kohli:");
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

getMostDismissalsByBowler()
  .then((result) => {
    console.log("Most Dismissals by a Bowler:");
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

getBestEconomyInSuperOvers()
  .then((result) => {
    console.log("Bowler with the Best Economy in Super Overs:");
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
