angular.module("league")
/* season 1 = 2015/16 season 2 = 2016/17*/

/*factory to store all teams in a league*/
.factory('getTeams', ['getData', function(getData){

  return {
    teamSeason1 : function(){
        return getData.getSeason1().then(function(data){
          return getTeamsFn(data); // function call to return all teams in season 1
          });
        },

    teamSeason2 : function(){
        return getData.getSeason2().then(function(data){
          return getTeamsFn(data); // function call to return all teams in season 2
          });
        }

  }
}])

/*factory to store all details per teams in a league*/
.factory('getTeamStats', ['getData', function(getData){

  return {
    teamStatsS01 : function(){
        return getData.getSeason1().then(function(data){
          return getTeamStatsFn(data);  // returns array of team objects from season 1
          });
        },

    teamStatsS02 : function(){
        return getData.getSeason2().then(function(data){
          return getTeamStatsFn(data); // returns array of team objects from season 2
          });
        }

  }

}])

/*helper function to store all teams in a league*/
function getTeamsFn(data){
  var match = data;
  var teamArray = [];
  var rounds = match.rounds;

  for(var i=0; i<rounds.length; i++){ // to store all the teams in an array

    for(var j=0; j<rounds[i].matches.length; j++){

        teamArray.push(rounds[i].matches[j].team1);
        teamArray.push(rounds[i].matches[j].team2);

    }
  }
  return _.uniqBy(teamArray, 'code'); // to remove the duplicates from team array
}

/*helper function to store all details per teams in a league*/
function getTeamStatsFn(data){
  var match = data;
  var teamStats = [];
  var rounds = match.rounds;
  var teams = getTeamsFn(match);

  for(eachTeam in teams){ // to go through each team in array
    var teamObj = {}
    teamObj.count = 0;
    teamObj.won = 0;
    teamObj.lost = 0;
    teamObj.draw = 0;
    rounds.forEach(function(eachRound){ // to go through each week data
        eachRound.matches.forEach(function(eachMatch){ // to go through each match data

          if(teams[eachTeam].code === eachMatch.team1.code){ // match team from array to team in match
            teamObj.code = teams[eachTeam].code; // store all team specific data in separate object
            teamObj.name = teams[eachTeam].name;
            teamObj.count += eachMatch.score1;

            if(eachMatch.score1 > eachMatch.score2){
              teamObj.won += 1;
            }
            if(eachMatch.score1 < eachMatch.score2){
              teamObj.lost += 1;
            }
            if(eachMatch.score1 == eachMatch.score2 && eachMatch.score1 !== null){
              teamObj.draw += 1;
            }
          }

          if(teams[eachTeam].code === eachMatch.team2.code){ // match team from array to team in match
            teamObj.code = teams[eachTeam].code; // store all team specific data in separate object
            teamObj.count += eachMatch.score2;

            if(eachMatch.score1 > eachMatch.score2){
              teamObj.lost += 1;
            }
            if(eachMatch.score1 < eachMatch.score2){
              teamObj.won += 1;
            }
            if(eachMatch.score1 == eachMatch.score2 && eachMatch.score1 !== null){
              teamObj.draw += 1;
            }
          }

        })
      })

      teamStats.push(teamObj);  // create an array with each element an object containing data of individual teams

    }
    return teamStats;

  }
