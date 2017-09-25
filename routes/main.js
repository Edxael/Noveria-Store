var router = require('express').Router();
var User = require('../models/user.js');
var Product = require('../models/product.js');



router.get('/', function(req, res){
  res.render('pages/main/00-index.ejs');
});

router.get('/1', function(req, res){
  res.render('pages/main/01-one.ejs');
});

// router.get('/2', function(req, res){
//   res.render('pages/02-two.ejs');
// });

// router.get('/users', function(req, res){
//   User.find({}, function(err, users){
//     res.json(users);
//   });
// });


router.get('/products/:id', function(req, res, next) {
  Product
    .find({ category: req.params.id })
    .populate('category')
    .exec(function(err, products) {
      if (err) return next(err);
      res.render('pages/main/category', {
        products: products
      });
    });
});


router.get('/product/:id', function(req, res, next){
  Product.findById({ _id: req.params.id }, function(err, product){
    if(err) return next(err);
    res.render('pages/main/product.ejs', {
      product: product
    });
  });
});

module.exports = router;
