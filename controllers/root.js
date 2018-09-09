module.exports = (app) => {

  app.get('/', (req, res) => {
    if(req.user){
      res.redirect('/map');
    }else{
      res.render('map');
    }
  });

  app.get('/landing', (req, res) => {
    res.render('landing');
  })

}
