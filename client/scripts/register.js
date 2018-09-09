


$('#registerForm').submit((e) => {
  e.preventDefault();
  let data = {
    name : $('#firstName').val() + " " + $('#lastName').val(),
    username : $('#username').val(),
    email : $('#email').val(),
    password : $('#password').val()
  };
  console.log(data);
  $.post('/register', data);
});
