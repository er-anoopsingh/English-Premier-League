angular.module("league")

/*controller to get list of all teams in the league*/
.controller('getMatchesCtrl', ['getTeams','getSeason','shareData','$location',
  function(getTeams, getSeason, shareData, $location){

  var vm = this;
  getSeason.matchesSeason1().then(function(league){
    vm.league1 = league.rounds;
    vm.showLeague = league.rounds;
    vm.year = '2015/16';
  });

  getSeason.matchesSeason2().then(function(league){
    vm.league2 = league.rounds;
  });

  getTeams.teamSeason1().then(function(teams){
    vm.teams1 =  _.sortBy(teams, 'name');
  });

  getTeams.teamSeason2().then(function(teams){
    vm.teams2 =  _.sortBy(teams, 'name');
  });

  vm.goToS1 = function(){
    vm.showLeague = vm.league1;
    vm.year = '2015/16';
    vm.name = '';
    vm.mon = '';
  }

  vm.goToS2 = function(){
    vm.showLeague = vm.league2;
    vm.year = '2016/17';
    vm.name = '';
    vm.mon = '';
  }

  vm.month = ['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];

  vm.disp = function(eachMatch){
    shareData.matchObj = eachMatch;
    $location.path('/match');
  }

  vm.viewTeam = function(team){

    shareData.team = team;
    shareData.year = vm.year;
    $location.path('/team');
  }

}])

.controller('displayMatchCtrl', ['shareData', function(shareData){

  var vm = this;
  vm.singleMatch = shareData.matchObj;
}])

.directive('allMatches', function() {
  return {
    scope: true,
    restrict: 'AE',
    replace: 'true',
    templateUrl: 'views/all-matches-template.html'
  };
});
