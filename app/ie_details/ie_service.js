app.service('CurrentServices', ['$http', '$q', function($http, $q) {
  /**
  * Below method will make a call to UAA url to get the access token which will be used for further API calls.
  * Users will have to create their own UAA as per the documentation.
  */
  function getUAAToken () {
      var deferred = $q.defer();
      // Below will be your UAA url.
      var urlUAA = 'https://e9db348e-3ac7-4c06-ab4f-3fab8611a4d5.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token?grant_type=client_credentials';

      // Ajax call to get UAA Access Token.
      $http({
            method: 'GET',
            url: urlUAA,
            headers: {'Authorization': 'Basic YW5zaHVsOmFuc2h1bA=='},
            timeout: 30000,
            cache: false
        })
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
  }
  /**
  * Below method will make a call to traffic api.
  * Users will have to create predix zone id for API calls as per the documentation.
  */
  function getTrafficData (uaaToken, startTime, endTime, size) {
      var token = 'Bearer '+ uaaToken;
      // Your traffic api predix zone id.
      var trafficPredixZoneId = '7f6545e2-3a78-4ee8-9390-a6616de09050';

      // Traffic Events URL. This will be obtained from HATEOAS model.
      var trafficEventsUrl = 'https://ie-traffic.run.aws-usw02-pr.ice.predix.io/v1/assets/1000000018/events';

      var deferred = $q.defer();

      // Ajax call to traffic events api.
      $http({
            method: 'GET',
            url: trafficEventsUrl,
            params: {'event-types':'TFEVT', 'start-ts':startTime, 'end-ts':endTime, 'size':size},
            headers: {'Authorization': token, 'Predix-Zone-Id': trafficPredixZoneId},
            timeout: 30000,
            cache: false
        })
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
  }
  /**
  * Below method will make a call to pedestrian api.
  * Users will have to create predix zone id for API calls as per the documentation.
  */
  function getPedestrianData (uaaToken, startTime, endTime, size) {
      var token = 'Bearer '+ uaaToken;
      // Your pedestrian api predix zone id.
      var pedestrianPredixZoneId = 'b160bde8-d2b9-4b58-b6df-c23babca1a49';

      // Pedestrian Events URL. This will be obtained from HATEOAS model.
      var pedestrianEventsUrl = 'https://ie-pedestrian.run.aws-usw02-pr.ice.predix.io/v1/assets/1000000027/events';

      var deferred = $q.defer();

      // Ajax call to pedestrian events api.
      $http({
            method: 'GET',
            url: pedestrianEventsUrl,
            params: {'event-types':'SFIN,SFOUT', 'start-ts':startTime, 'end-ts':endTime, 'size':size},
            headers: {'Authorization': token, 'Predix-Zone-Id': pedestrianPredixZoneId},
            timeout: 30000,
            cache: false
        })
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
  }
  /**
  * Below method will make a call to public safety api.
  * Users will have to create predix zone id for API calls as per the documentation.
  */
  function getPublicSafetyData (uaaToken, startTime, endTime, size) {
      var token = 'Bearer '+ uaaToken;
      // Public Events URL. This will be obtained from HATEOAS model.
      var publicSafetyEventsUrl = 'https://ie-public-safety.run.aws-usw02-pr.ice.predix.io/v1/assets/1000000024/media';

      // Your public safety api predix zone id.
      var publicSafetyPredixZoneId = 'c75697cb-873c-4ebb-abeb-9c6c9ecd3fc7';

      var deferred = $q.defer();

      // Ajax call to public safety media api.
      $http({
            method: 'GET',
            url: publicSafetyEventsUrl,
            params: {'media-types':'IMAGE,VIDEO', 'start-ts':startTime, 'end-ts':endTime, 'size':size},
            headers: {'Authorization': token, 'Predix-Zone-Id': publicSafetyPredixZoneId},
            timeout: 30000,
            cache: false
        })
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
  }

  /**
  * Below method will make a call to parking api.
  * Users will have to create predix zone id for API calls as per the documentation.
  */
  function getParkingData (uaaToken, startTime, endTime, size) {
      var token = 'Bearer '+ uaaToken;
      // Parking Events URL. This will be obtained from HATEOAS model.
      var parkingEventsUrl = 'https://ie-parking.run.aws-usw02-pr.ice.predix.io/v1/assets/1000000018/events';

      // Your parking api predix zone id.
      var parkingPredixZoneId = 'a108a7b0-3bcf-49ac-aec5-3070c80ed1b5';

      var deferred = $q.defer();

      // Ajax call to parking media api.
      $http({
            method: 'GET',
            url: parkingEventsUrl,
            params: {'event-types':'PKIN,PKOUT', 'start-ts':startTime, 'end-ts':endTime, 'size':size},
            headers: {'Authorization': token, 'Predix-Zone-Id': parkingPredixZoneId},
            timeout: 30000,
            cache: false
        })
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
  }

  /**
  * Below method will make a call to image api.
  * Users will have to create predix zone id for API calls as per the documentation.
  */
  function getImage (uaaToken, imageUrl) {
      var token = 'Bearer '+uaaToken;

      // Your image api predix zone id.
      var imagePredixZoneId = 'c75697cb-873c-4ebb-abeb-9c6c9ecd3fc7';
      var deferred = $q.defer();

      // Ajax call to media api.
      $http({
            method: 'GET',
            url: imageUrl,
            headers: {'Authorization': token, 'Predix-Zone-Id': imagePredixZoneId},
            timeout: 30000,
            cache: false
        })
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
  }

  /**
  * Below method will make a call to environmental occupancy api.
  * Users will have to create predix zone id for API calls as per the documentation.
  */
  function getEnvOccupancy (uaaToken, startTime, endTime, size) {
      var token = 'Bearer '+ uaaToken;
      // Env occupancy Events URL. This will be obtained from HATEOAS model.
      var envUrl = 'https://ie-environmental.run.aws-usw02-pr.ice.predix.io/v1/assets/1000000540/events';

      // Your env api predix zone id.
      var envPredixZoneId = '572c0c03-d942-4e07-97cd-ac1c4a31242b';
      var deferred = $q.defer();

      // Ajax call to environmental occupancy api.
      $http({
            method: 'GET',
            url: envUrl,
            headers: {'Authorization': token, 'Predix-Zone-Id': envPredixZoneId},
            params: {'event-types':'OCCUPANCY', 'start-ts':startTime, 'end-ts':endTime, 'size':size},
            timeout: 30000,
            cache: false
        })
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
  }
  /**
  * Below method will make a call to environmental temparature api.
  * Users will have to create predix zone id for API calls as per the documentation.
  */
  function getEnvTemp (uaaToken, startTime, endTime, size) {
      var token = 'Bearer '+ uaaToken;

      // Env temparature Events URL. This will be obtained from HATEOAS model.
      var envUrl = 'https://ie-environmental.run.aws-usw02-pr.ice.predix.io/v1/assets/1000000540/events';

      // Your env api predix zone id.
      var envPredixZoneId = '572c0c03-d942-4e07-97cd-ac1c4a31242b';
      var deferred = $q.defer();

      // Ajax call to environmental temparature api.
      $http({
            method: 'GET',
            url: envUrl,
            headers: {'Authorization': token, 'Predix-Zone-Id': envPredixZoneId},
            params: {'event-types':'TEMP', 'start-ts':startTime, 'end-ts':endTime, 'size':size},
            timeout: 30000,
            cache: false
        })
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
  }
  /**
  * Below method will make a call to environmental light level api.
  * Users will have to create predix zone id for API calls as per the documentation.
  */
  function getEnvLight (uaaToken, startTime, endTime, size) {
      var token = 'Bearer '+ uaaToken;

      // Env light level Events URL. This will be obtained from HATEOAS model.
      var envUrl = 'https://ie-environmental.run.aws-usw02-pr.ice.predix.io/v1/assets/1000000540/events';

      // Your env api predix zone id
      var envPredixZoneId = '572c0c03-d942-4e07-97cd-ac1c4a31242b';
      var deferred = $q.defer();

      // Ajax call to environmental light_level api.
      $http({
            method: 'GET',
            url: envUrl,
            headers: {'Authorization': token, 'Predix-Zone-Id': envPredixZoneId},
            params: {'event-types':'LIGHT_LEVEL', 'start-ts':startTime, 'end-ts':endTime, 'size':size},
            timeout: 30000,
            cache: false
        })
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
  }
  /**
  * Below method will make a call to historical path api.
  * Users will have to create predix zone id for API calls as per the documentation.
  */
  function getHistoricalPath (uaaToken, startTime, endTime) {
      var token = 'Bearer '+ uaaToken;

      // Historical path analytics URL. This will be obtained from HATEOAS model.
      var positioningUrl = 'https://ie-positioning.run.aws-usw02-pr.ice.predix.io/v1/locations/1000000106/analytics';

      // Your historical positioning api predix zone id
      var positioningPredixZoneId = '76f63195-cb1d-4871-9af8-f12f97745571';
      var deferred = $q.defer();

      // Ajax call to historical path api.
      $http({
            method: 'GET',
            url: positioningUrl,
            headers: {'Authorization': token, 'Predix-Zone-Id': positioningPredixZoneId},
            params: {'analytic-names':'PTHDVCE', 'analytic-categories':'PATH', 'start-ts':startTime, 'end-ts':endTime},
            timeout: 30000,
            cache: false
        })
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
  }

  /**
  * Below method will make a call to historical positioning api.
  * Users will have to create predix zone id for API calls as per the documentation.
  */
  function getHistoricalPosition (uaaToken, startTime, endTime) {
      var token = 'Bearer '+ uaaToken;

      // Historical positioning analytics URL. This will be obtained from HATEOAS model.
      var positioningUrl = 'https://ie-positioning.run.aws-usw02-pr.ice.predix.io/v1/locations/1000000106/analytics';

      // Your historical positioning api predix zone id
      var positioningPredixZoneId = '76f63195-cb1d-4871-9af8-f12f97745571';
      var deferred = $q.defer();

      // Ajax call to historical positioning api.
      $http({
            method: 'GET',
            url: positioningUrl,
            headers: {'Authorization': token, 'Predix-Zone-Id': positioningPredixZoneId},
            params: {'analytic-names':'HTMPXY', 'analytic-categories':'POSITION', 'start-ts':startTime, 'end-ts':endTime},
            timeout: 30000,
            cache: false
        })
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
  }

  /**
  * Below method will make a call to historical dwell time api.
  * Users will have to create predix zone id for API calls as per the documentation.
  */
  function getHistoricalDwellTime (uaaToken, startTime, endTime) {
      var token = 'Bearer '+ uaaToken;

      // Historical dwell time analytics URL. This will be obtained from HATEOAS model.
      var positioningUrl = 'https://ie-positioning.run.aws-usw02-pr.ice.predix.io/v1/locations/1000000106/analytics';

      // Your historical positioning api predix zone id
      var positioningPredixZoneId = '76f63195-cb1d-4871-9af8-f12f97745571';
      var deferred = $q.defer();

      // Ajax call to historical positioning api.
      $http({
            method: 'GET',
            url: positioningUrl,
            headers: {'Authorization': token, 'Predix-Zone-Id': positioningPredixZoneId},
            params: {'analytic-names':'DWLZONE', 'analytic-categories':'DWELL_TIME', 'start-ts':startTime, 'end-ts':endTime},
            timeout: 30000,
            cache: false
        })
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
  }

  return {
    getUAAToken: getUAAToken,
    getTrafficData: getTrafficData,
    getPedestrianData: getPedestrianData,
    getPublicSafetyData: getPublicSafetyData,
    getParkingData: getParkingData,
    getImage: getImage,
    getEnvOccupancy: getEnvOccupancy,
    getEnvTemp: getEnvTemp,
    getEnvLight: getEnvLight,
    getHistoricalPath: getHistoricalPath,
    getHistoricalPosition: getHistoricalPosition,
    getHistoricalDwellTime: getHistoricalDwellTime
  };
}]);
