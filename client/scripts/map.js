showMapWithUserLocation = (userLoc) => {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: userLoc,
    zoom: 18,
    styles : mapStyles,
    disableDefaultUI: true,
  });

}
