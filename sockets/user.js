module.exports = (socket, io) => {

  socket.on('findNearUsers', (userLocation) => {
    //Fake User Data for testing
    console.log(userLocation);
    let fakeUsers = [
      {
        top : userLocation.top - 10,
        left: userLocation.left - 10
      }
    ]
    socket.emit('updateUserPos', fakeUsers);
  })

}
