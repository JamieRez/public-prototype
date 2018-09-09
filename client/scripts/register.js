
$('#registerForm').submit((e) => {
  e.preventDefault();
});

submitForm = () => {
  let fullName = $('#firstName').val() + " " + $('#lastName').val();
  let data = {
    name : fullName,
    username : $('#username').val(),
    email : $('#email').val(),
    password : $('#password').val()
  };
  $.post('/register', data, (d) => {
    if(d.err){
      console.log(d.err)
    }else{
      window.location = "/map";
    }
  });
}
