var router = require('express').Router();
var User = require('../models/user');



//       Code to use Postman
router.post('/signup', function(req, res, next){
  var user = new User();
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

    User.findOne({ email: req.body.email }, function(err, existingUser){
      if(existingUser){

        console.log( "The Email: " + req.body.email + " Is alredy in use." );
        return res.redirect('sign-up');

      }else {

        user.save(function(err, user){
          if(err) return next(err);
          res.json("Succesfully created a new user.")
        });

      }
    });

});


module.exports = router;
