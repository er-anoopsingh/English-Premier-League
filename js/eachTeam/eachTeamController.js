angular.module("league")
/* season 1 = 2015/16 season 2 = 2016/17*/

/*controller to get statistics related to each team in league*/
.controller('getTeamStatsCtrl', ['getTeamStats', 'shareData','$location',
  function(getTeamStats, shareData, $location){

  var vm = this;
  vm.sortType = "won"; //to have default sort by team that won most matches
  vm.sortReverse = true; //to sort from highest to lowest
  getTeamStats.teamStatsS01().then(function(stats){ //to store stats of teams in season 1
    vm.statS01 = stats;
    vm.season = vm.statS01;
  })

  getTeamStats.teamStatsS02().then(function(stats){ //to store stats of teams in season 1
    vm.statS02 = stats;
  })

    vm.disp = function(team){ //ng-click function to pass team code to view 'team'
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
  getTeamStats.teamStatsS01().then(function(stats){ //to store a specific team data from season 1
    vm.statS01 = stats;
    for(team in stats){
      if(stats[team].code == shareData.team){ // match the team code with array of teams from season 1
        vm.team1 = stats[team];
      }
    }
  })

  getTeamStats.teamStatsS02().then(function(stats){ //to store a specific team data from season 2
    vm.statS01 = stats;
    for(team in stats){
      if(stats[team].code == shareData.team){ // match the team code with array of teams from season 2
        vm.team2 = stats[team];
      }
    }
  })

}])
