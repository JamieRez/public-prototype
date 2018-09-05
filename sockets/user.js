module.exports = (socket, io) => {

  socket.on('findNearUsers', (userLocation) => {
    //Fake User Data for testing
    console.log(userLocation);
    let fakeUsers = [
      {
        top : (userLocation.top - 10) / 20,
        left: (userLocation.left - 10) / 20
      }
    ]
    socket.emit('updateUserPos', fakeUsers);
  })

}
