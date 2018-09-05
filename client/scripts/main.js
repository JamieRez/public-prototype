const socket = io.connect();

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      // Get current cordinates.
      positionCords = {"lat": position.coords.latitude, "lng": position.coords.longitude};
      console.log(positionCords);
    },
    function(error) {
      console.log("Failed");
    },
    {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000}
  );
}
