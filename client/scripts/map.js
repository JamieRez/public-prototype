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
  //Map and user in place. Time to load connected users
  socket.emit('findNearUsers', userLoc);
}

socket.on('showUserOnMap', (user) => {
  //IF USER IS ALREADY CONNECTED TO APP, REMOVE THE OLDER INSTANCE
  if(onlineUsers[user.username]){
    mapUserMarkers[user.username].setMap(null);
    delete mapUserMarkers[user.username];
    delete onlineUsers[user.username];
  }
  onlineUsers[user.username] = user;
  let randColorIndex = Math.floor(Math.random() * 7);
  let markerImage = {
    url : userColors[randColorIndex],
  }
  let userMarker = new google.maps.Marker({
    position : user.loc,
    map : map,
    icon : markerImage
  });
  mapUserMarkers[user.username] = userMarker;
});

socket.on('userLeft', (username) => {
  mapUserMarkers[username].setMap(null);
  delete mapUserMarkers[username];
  delete onlineUsers[username];
})
