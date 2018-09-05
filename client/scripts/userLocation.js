updateUserPosition = (userLoc) => {

  socket.emit('findNearUsers', userLoc);

  socket.on('updateUserPos', (users) => {
    users.forEach((user) => {
      let newUser = $('.user').clone();
      newUser.appendTo('.app');
      newUser.offset(user);
    })
  })
  // let userPos = {
  //   left : '50%',
  //   top : '50%'
  // }
  // console.log(userPos);
  // $('.user').offset(userPos);
}
