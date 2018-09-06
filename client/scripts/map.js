showMapWithUserLocation = (userLoc) => {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: userLoc,
    zoom: 18,
    styles : mapStyles,
    disableDefaultUI: true,
  });
  let markerImage = {
    url : '/client/assets/userPin.svg',
  }
  let userMarker = new google.maps.Marker({
    position : userLoc,
    map : map,
    icon : markerImage
  });


}
