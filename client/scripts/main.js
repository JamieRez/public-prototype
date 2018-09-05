const socket = io.connect();

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      // Get current cordinates.
      userLoc = {
        left: position.coords.latitude,
        top: position.coords.longitude
      };
      updateUserPos(userLoc);
    },
    function(error) {
      console.log("Failed");
    },
    {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000}
  );
}
