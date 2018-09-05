module.exports = (socket, io) => {

  socket.on('findNearUsers', (userLocation, userPosition) => {
    //Fake User Data for testing
    let fakeUsers = [
      {
        longitude : -122.411010,
        latitude: 37.787790
      }
    ]
    socket.emit('updateUserPos', fakeUsers);
  })

}
