let userColors = [
  '/assets/user-purple.svg',
  '/assets/user-blue.svg',
  '/assets/user-green.svg',
  '/assets/user-indigo.svg',
  '/assets/user-peach.svg',
  '/assets/user-red.svg',
  '/assets/user-yellow.svg',
]

let map;
let mapUserMarkers = {};

showMapAtUserLocation = (userLoc) => {

  map = new google.maps.Map(document.getElementById('map'), {
    center: userLoc,
    zoom: 13,
    styles : mapStyles,
    disableDefaultUI: true,
  });
  // let randColorIndex = Math.floor(Math.random() * 7);
  // let markerImage = {
  //   url : userColors[randColorIndex],
  // }
  // let userMarker = new google.maps.Marker({
  //   position : userLoc,
  //   map : map,
  //   icon : markerImage
  // });
  //Map and user in place. Time to load connected users
  socket.emit('findNearUsers', userLoc);
}

socket.on('showUserOnMap', (user) => {
  onlineUsers[user.socket] = user;
  let randColorIndex = Math.floor(Math.random() * 7);
  let markerImage = {
    url : userColors[randColorIndex],
  }
  let userMarker = new google.maps.Marker({
    position : user.loc,
    map : map,
    icon : markerImage
  });
  mapUserMarkers[user.socket] = userMarker;
});

socket.on('userLeft', (userId) => {
  mapUserMarkers[userId].setMap(null);
  delete mapUserMarkers[userId];
  delete onlineUsers[userId];
})
