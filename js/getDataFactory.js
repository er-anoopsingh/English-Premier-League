angular.module("league")

.factory('getData',['$http', function($http){
  return {

    getSeason1: function(){
     return $http({
        method: 'GET',
        url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json'
      }).then(function(response){
        return response.data;
      }, function(response){
      });
    },

    getSeason2: function(){
     return $http({
        method: 'GET',
        url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json'
      }).then(function(response){
        return response.data;
      }, function(response){
      });
    }
  };

}]);
