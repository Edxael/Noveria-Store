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


router.get('/signup', function(req, res, next) {
  res.render('pages/acc/01-signup.ejs', {
    errors: req.flash('errors')
  });
});

var data1 = bodyParser.urlencoded({ extended: false });



//       Code to use Postman
router.post('/signup', data1, function(req, res, next){
  var user = new User();
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;
  user.address = req.body.address;
  user.profile.picture = user.gravatar();

    User.findOne({ email: req.body.email }, function(err, existingUser){
      if(existingUser){
        req.flash('errors', 'Account with that email address already exists');
        return res.redirect('/signup');

      }else {
        user.save(function(err, user){
          if(err) return next(err);
          req.logIn(user, function(err){
            if(err){ return next(err); }
            res.redirect('/profile');
          });

        });

      }
    });

});


    // Code to log-Out from the session
router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});



    // Code for Editing account information
router.get('/edit-profile', function(req, res, next){
  res.render('pages/acc/04-edit-profile.ejs', { message: req.flash('success') });
});

router.post('/edit-profile', function(req, res, next){
  User.findOne({ _id: req.user._id }, function(err, user) {

    if (err) return next(err);

    if (req.body.name) user.profile.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.address) user.address = req.body.address;

    user.save(function(err) {
      if (err) return next(err);
      req.flash('success', 'Successfully Edited your profile');
      return res.redirect('/profile');
    });
  });
});






module.exports = router;
