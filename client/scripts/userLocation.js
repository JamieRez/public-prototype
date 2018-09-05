updateUserPosition = (userLoc) => {

  socket.emit('findNearUsers', userLoc);

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
