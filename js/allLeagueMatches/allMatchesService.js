angular.module("league")

/* season 1 = 2015/16 season 2 = 2016/17*/
/*factory to format dates and return all the data for league*/
.factory('getSeason', ['getData','$filter', function(getData, $filter){

  return {
    matchesSeason1 : function(){ //to return data of season 1 after changing date format
        return getData.getSeason1().then(function(data){
          data.rounds.forEach(function(matchDay){
            matchDay.matches.forEach(function(eachMatch){
              eachMatch.date = $filter('date')(eachMatch.date, 'mediumDate'); // change format of date
            })
          })
          return data;
          });
        },

    matchesSeason2 : function(){ //to return data of season 2 after changing date format
        return getData.getSeason2().then(function(data){

          data.rounds.forEach(function(matchDay){
            matchDay.matches.forEach(function(eachMatch){
              eachMatch.date = $filter('date')(eachMatch.date, 'mediumDate'); // change format of date
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
