angular.module("league")

/*factory to store all teams in a league*/
.factory('getTeams', ['getData', function(getData){

  return {
    teamSeason1 : function(){
        return getData.getSeason1().then(function(data){
          return getTeamsFn(data);
          });
        },

    teamSeason2 : function(){
        return getData.getSeason2().then(function(data){
          return getTeamsFn(data);
          });
        }

  }
}])

/*factory to store all details per teams in a league*/
.factory('getTeamStats', ['getData', function(getData){

  return {
    teamStatsS01 : function(){
        return getData.getSeason1().then(function(data){
          return getTeamStatsFn(data);
          });
        },

    teamStatsS02 : function(){
        return getData.getSeason2().then(function(data){
          return getTeamStatsFn(data);
          });
        }

  }

}])

/*helper function to store all teams in a league*/
function getTeamsFn(data){
  var match = data;
  var teamArray = [];
  var rounds = match.rounds;

  for(var i=0; i<rounds.length; i++){

    for(var j=0; j<rounds[i].matches.length; j++){

        teamArray.push(rounds[i].matches[j].team1);
        teamArray.push(rounds[i].matches[j].team2);

    }
  }
  return _.uniqBy(teamArray, 'code');
}

/*helper function to store all details per teams in a league*/
function getTeamStatsFn(data){
  var match = data;
  var teamStats = [];
  var rounds = match.rounds;
  var teams = getTeamsFn(match);

  for(eachTeam in teams){
    var teamObj = {}
    teamObj.count = 0;
    teamObj.won = 0;
    teamObj.lost = 0;
    teamObj.draw = 0;
    rounds.forEach(function(eachRound){
        eachRound.matches.forEach(function(eachMatch){

          if(teams[eachTeam].code === eachMatch.team1.code){
            teamObj.code = teams[eachTeam].code;
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

          if(teams[eachTeam].code === eachMatch.team2.code){
            teamObj.code = teams[eachTeam].code;
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

      teamStats.push(teamObj);

    }
    return teamStats;

  }
