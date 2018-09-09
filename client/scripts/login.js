$('#loginForm').submit((e) => {
  e.preventDefault();
});

submitForm = () => {
  let data = {
    username : $('#username').val(),
    password : $('#password').val()
  };
  $.post('/login', data, (d) => {
    if(d.err){
      console.log(d.err);
    }else{
      window.location = '/map';
    }
  });
}
