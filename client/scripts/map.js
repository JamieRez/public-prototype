showMapWithUserLocation = (userLoc) => {

  let userColors = [
    '/assets/user-purple.svg',
    '/assets/user-blue.svg',
    '/assets/user-green.svg',
    '/assets/user-indigo.svg',
    '/assets/user-peach.svg',
    '/assets/user-red.svg',
    '/assets/user-yellow.svg',
  ]

  var map = new google.maps.Map(document.getElementById('map'), {
    center: userLoc,
    zoom: 13,
    styles : mapStyles,
    disableDefaultUI: true,
  });
  let randColorIndex = Math.floor(Math.random() * 7);
  let markerImage = {
    url : userColors[randColorIndex],
  }
  let userMarker = new google.maps.Marker({
    position : userLoc,
    map : map,
    icon : markerImage
  });


}
