angular.module("league", ['ngRoute'])

.config(['$routeProvider', function($routeProvider){

  $routeProvider.when('/', {
    templateUrl: 'views/all-matches.html',
    controller: 'getMatchesCtrl',
    controllerAs: 'matches'
  })
  .when('/match', {
    templateUrl: 'views/single-matches.html',
    controller: 'displayMatchCtrl',
    controllerAs: 'matches'
  })
  .when('/team', {
    templateUrl: 'views/team-stats.html',
    controller: 'dispTeamCtrl',
    controllerAs: 'teams'
  })
  .when('/allteams', {
    templateUrl: 'views/all-teams.html',
    controller: 'getTeamStatsCtrl',
    controllerAs: 'teams'
  })
  .otherwise({
    redirectTo: '/'
  })

}])
