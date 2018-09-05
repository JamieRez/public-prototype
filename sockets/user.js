module.exports = (socket, io) => {

  socket.on('findNearUsers', (userLocation) => {
    //Fake User Data for testing
    console.log(userLocation);
    let fakeUsers = [
      {
        top : (userLocation.top / userLocation.top - 1);
        left: (userLocation.left / userLocation.left - 1);
      }
    ]
    socket.emit('updateUserPos', fakeUsers);
  })

}
