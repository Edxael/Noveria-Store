var router = require('express').Router();
var User = require('../models/user');
var bodyParser = require('body-parser');
var passport = require('passport');
var passportConf = require('../config/passport.js');


router.get('/login', function(req, res){
  if(req.user) return res.redirect('/profile');
  res.render('pages/acc/02-login.ejs', { message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));


router.get('/profile', function(req, res, next){
  User.findOne({ _id: req.user._id }, function(err, user){
    if(err) return next(err);
    res.render('pages/acc/03-profile.ejs', { user: user });
  });
});


router.get('/3', function(req, res, next) {
  res.render('pages/acc/01-signup.ejs', {
    errors: req.flash('errors')
  });
});

var data1 = bodyParser.urlencoded({ extended: false });

//       Code to use Postman
router.post('/3', data1, function(req, res, next){
  var user = new User();
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

    User.findOne({ email: req.body.email }, function(err, existingUser){
      if(existingUser){
        // console.log( "The Email: " + req.body.email + " Is alredy in use." );
        req.flash('errors', 'Account with that email address already exists');
        // return res.redirect('pages/acc/01-signup.ejs');
        return res.redirect('/3');

      }else {

        user.save(function(err, user){
          if(err) return next(err);

          return res.redirect('/');

        });

      }
    });

});


module.exports = router;
