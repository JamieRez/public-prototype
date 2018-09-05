updateUserPosition = (userGeoData) => {
  let userLocation = {
    top : userGeoData.coords.longitude,
    left : userGeoData.coords.latitude
  }
  socket.emit('findNearUsers', userLocation);

  socket.on('updateUserPos', (users) => {
    console.log(users);
  })
  // let userPos = {
  //   left : '50%',
  //   top : '50%'
  // }
  // console.log(userPos);
  // $('.user').offset(userPos);
}
