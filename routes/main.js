var router = require('express').Router();



router.get('/', function(req, res){
  res.render('pages/00-index.ejs');
});

router.get('/1', function(req, res){
  res.render('pages/01-one.ejs');
});

router.get('/2', function(req, res){
  res.render('pages/02-two.ejs');
});




module.exports = router;
