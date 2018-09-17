const User = require('../models/User');

module.exports = (socket, io, onlineUsers) => {

  socket.on('new user', (user, userLoc) => {
    // IF USER IS ALREADY IN APP, REMOVE THE OLDER INSTANCE
    if(onlineUsers[user.username]){
      delete onlineUsers[user.username];
    }
    let thisUser = {
      loc : userLoc,
      socket : socket.id,
      name : user.name,
      username : user.username
    }
    onlineUsers[user.username] = thisUser;
    socket["username"] = user.username;
    io.emit('showUserOnMap', thisUser);
    console.log(onlineUsers);
  })

  socket.on('findNearUsers', (userLocation, userPosition) => {
    for(username in onlineUsers){
      if(username != socket.username) {
        socket.emit('showUserOnMap', onlineUsers[username]);
      }
    }
  });



}
