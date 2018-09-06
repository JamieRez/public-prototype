module.exports = (app) => {

  app.get('/', (req, res) => {
    if(req.user){
      res.render('map', {user: req.user});
    }else{
      res.redirect('/landing');
    }
  });

  app.get('/landing', (req, res) => {
    res.render('landing');
  })

}
