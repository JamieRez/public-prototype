module.exports = (socket, io, onlineUsers) => {

  socket.on('new user', (userLoc) => {
    let thisUser = {
      loc : userLoc,
      socket : socket.id
    }
    onlineUsers[socket.id] = thisUser;
    io.emit('showUserOnMap', thisUser);
  })

  socket.on('findNearUsers', (userLocation, userPosition) => {
    for(id in onlineUsers){
      if(id != socket.id) {
        socket.emit('showUserOnMap', onlineUsers[id]);
      }
    }
  });



}
