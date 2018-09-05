// updateUserPosition = (userLoc) => {
//
//   let userPos = $('.client').offset();
//
//   socket.emit('findNearUsers', userLoc, userPos);
//
//   socket.on('updateUserPos', (users) => {
//     users.forEach((user) => {
//       let newUser = $('.client').clone().removeClass('client').addClass('user');
//       newUser.css({"top" : user.top, "left" : user.left});
//       newUser.appendTo('.app');
//     })
//   })
//   // let userPos = {
//   //   left : '50%',
//   //   top : '50%'
//   // }
//   // console.log(userPos);
//   // $('.user').offset(userPos);
// }
