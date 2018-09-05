showMapWithUserLocation = (userLoc) => {
  console.log(userLoc);
  var map = new google.maps.Map(document.getElementById('map'), {
    center: userLoc,
    zoom: 8
  });

}
