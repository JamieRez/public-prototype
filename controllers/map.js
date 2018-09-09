module.exports = (app) => {

  app.get('/map', (req, res) => {
    res.render('map', {user : req.user});
  });

}
