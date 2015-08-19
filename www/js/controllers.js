angular.module('starter.controllers', ['ionic'])

.constant('FORECASTIO_KEY', '7657085f18edee4df92a9df109498d2e')

.controller('HomeCtrl', function($scope, $state, Weather, DataStore){
  //read default settings into scope
  console.log('inside home');
  $scope.city = DataStore.city;

  var latitude = DataStore.latitude;
  var longitude = DataStore.longitude;

  //call getCurrentWeather method in factory 'Weather'
  Weather.getCurrentWeather(latitude,longitude).then (function(response){
    $scope.current = response.data;
    console.log('Got current', $scope.current);

    //debugger

  }, function(error){
    alert('Unable to get current conditions');
    console.error(error);
  });

})

.controller('LocationsCtrl', function($scope, $state, Cities, DataStore){
  console.log('inside locations');
  $scope.cities = Cities.all();

  $scope.changeCity = function(cityId){
    //get lat and long for selected location

    var lat  = $scope.cities[cityId].lat; //latitude
    var lgn  = $scope.cities[cityId].lgn; //longitude
    var city = $scope.cities[cityId].name; //city name

    DataStore.setCity(city);
    DataStore.setLatitude(lat);
    DataStore.setLongitude(lgn);

    $state.go('tab.home');
  }
})

.controller('SettingsCtrl', function($scope){
  console.log('inside settings');
  //manages app settings
})