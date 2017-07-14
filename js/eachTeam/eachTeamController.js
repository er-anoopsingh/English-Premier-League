angular.module("league")

/*controller to get list of all teams in the league*/
.controller('getTeamsCtrl', ['getTeams', function(getTeams){

  var vm = this;
  getTeams.teamSeason1().then(function(teams){
    vm.teams = teams;
  })

}])

/*controller to get statistics related to each team in league*/
.controller('getTeamStatsCtrl', ['getTeamStats', 'shareData','$location',
  function(getTeamStats, shareData, $location){

  var vm = this;
  vm.sortType = "won";
  vm.sortReverse = true;
  getTeamStats.teamStatsS01().then(function(stats){
    vm.statS01 = stats;
    vm.season = vm.statS01;
  })

  getTeamStats.teamStatsS02().then(function(stats){
    vm.statS02 = stats;
  })

    vm.disp = function(team){
      shareData.team = team;
      if(vm.season == vm.statS01){
        shareData.year = '2015/16';
      }
      else{
        shareData.year = '2016/17';
      }
      $location.path('/team');
    }

}])

/*controller to display details for each team*/
.controller('dispTeamCtrl', ['getTeamStats', 'shareData', function(getTeamStats, shareData){

  var vm = this;
  vm.year = shareData.year;
  getTeamStats.teamStatsS01().then(function(stats){
    vm.statS01 = stats;
    for(team in stats){
      if(stats[team].code == shareData.team){
        vm.team1 = stats[team];
      }
    }
  })

  getTeamStats.teamStatsS02().then(function(stats){
    vm.statS01 = stats;
    for(team in stats){
      if(stats[team].code == shareData.team){
        vm.team2 = stats[team];
      }
    }
  })

}])
