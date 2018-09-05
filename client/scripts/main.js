const socket = io.connect();

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      // Get current cordinates
      userLoc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      showMapWithUserLocation(userLoc);
    },
    function(error) {
      console.log("Failed");
    },
    {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000}
  );
}
