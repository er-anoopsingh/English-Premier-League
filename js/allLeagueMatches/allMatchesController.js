angular.module("league")
/* season 1 = 2015/16 season 2 = 2016/17*/
/*controller to get details of all matches in all the leagues*/
.controller('getMatchesCtrl', ['getTeams','getSeason','shareData','$location',
  function(getTeams, getSeason, shareData, $location){

  var vm = this;
  getSeason.matchesSeason1().then(function(league){ //gets all matches in season 1 and stores in league1
    vm.league1 = league.rounds;
    vm.showLeague = league.rounds;
    vm.year = '2015/16';
  });

  getSeason.matchesSeason2().then(function(league){ //gets all matches in season 2 and stores in league2
    vm.league2 = league.rounds;
  });

  getTeams.teamSeason1().then(function(teams){ //gets all teams from season 1 and stores in teams1
    vm.teams1 =  _.sortBy(teams, 'name');
  });

  getTeams.teamSeason2().then(function(teams){ //gets all teams from season 2 and stores in teams2
    vm.teams2 =  _.sortBy(teams, 'name');
  });

  vm.goToS1 = function(){ //resets all filters when switching to season 1
    vm.showLeague = vm.league1;
    vm.year = '2015/16';
    vm.name = '';
    vm.mon = '';
  }

  vm.goToS2 = function(){ //resets all filters when switching to season 2
    vm.showLeague = vm.league2;
    vm.year = '2016/17';
    vm.name = '';
    vm.mon = '';
  }

  vm.month = ['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];

  vm.disp = function(eachMatch){ //ng-click function to pass a single match data to view "match"
    shareData.matchObj = eachMatch;
    $location.path('/match');
  }

  vm.viewTeam = function(team){ //ng-click function to pass a single team data to view "team"

    shareData.team = team;
    shareData.year = vm.year;
    $location.path('/team');
  }

}])

/*controller to dsiplay single match details*/
.controller('displayMatchCtrl', ['shareData', function(shareData){

  var vm = this;
  vm.singleMatch = shareData.matchObj;  // store single match data

}])

/*directive to show all matches in a league*/
.directive('allMatches', function() {
  return {
    scope: true,
    restrict: 'AE',
    replace: 'true',
    templateUrl: 'views/all-matches-template.html'
  };
});
