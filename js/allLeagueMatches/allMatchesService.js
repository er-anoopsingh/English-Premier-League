angular.module("league")

/*factory to format dates and return all the data for league*/
.factory('getSeason', ['getData','$filter', function(getData, $filter){

  return {
    matchesSeason1 : function(){
        return getData.getSeason1().then(function(data){
          data.rounds.forEach(function(matchDay){
            matchDay.matches.forEach(function(eachMatch){
              eachMatch.date = $filter('date')(eachMatch.date, 'mediumDate');
            })
          })
          return data;
          });
        },

    matchesSeason2 : function(){
        return getData.getSeason2().then(function(data){

          data.rounds.forEach(function(matchDay){
            matchDay.matches.forEach(function(eachMatch){
              eachMatch.date = $filter('date')(eachMatch.date, 'mediumDate');
            })
          })

          return data;
          });
        }

  }
}])

/*factory to share data between various controllers*/
.factory('shareData', function(){
  return{
    matchObj : '',
    team: '',
    year: ''
  }
})
