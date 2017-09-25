var router = require('express').Router();
var Category = require('../models/category.js');


router.get('/add-category', function(req, res, next){
  res.render('pages/admin/add-category.ejs', { message: req.flash('success') });
});

router.post('/add-category', function(req, res, next){
  var category = new Category();
  category.name = req.body.name;

  category.save(function(err){
    if(err) return next(err);
    req.flash('success', 'Successfylly added a category');
    return res.redirect('/add-category');
  });
});


module.exports = router;
