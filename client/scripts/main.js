const socket = io.connect();
const onlineUsers = {};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      // Get current cordinates
      userLoc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      showMapAtUserLocation(userLoc);
      socket.emit('new user', userLoc);
    },
    function(error) {
      console.log("Failed");
    },
    {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000}
  );
}


// setTimeout(function (){
//
//   //Generate random location in San Francisco (Testing Purposes)
//   randLocBounds = {
//     lat : {
//       max : 37.806000,
//       min : 37.771000
//     },
//     lng : {
//       max : -122.389000,
//       min : -122.433000
//     }
//   };
//
//   randLocation = {
//     lat : (Math.random() * (randLocBounds.lat.max - randLocBounds.lat.min)) + randLocBounds.lat.min,
//     lng : (Math.random() * (randLocBounds.lng.max - randLocBounds.lng.min)) + randLocBounds.lng.min,
//   }
//   showMapAtUserLocation(randLocation);
//   socket.emit('new user', randLocation);
//
// }, 1000);
