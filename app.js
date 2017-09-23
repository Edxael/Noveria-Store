var express = require('express');
var app = express();
var morgan = require('morgan');
var ejs = require('ejs');
var engine_mate = require('ejs-mate');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo/es5')(session);
var passport = require('passport');


var mySecret = require('./config/secret.js');
var User = require('./models/user.js');
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/ruser.js');
// var userRoutes = require('./routes/ruser');



    // ---------------------------------------

mongoose.connect( mySecret.database , function(err){
  if(err){
    console.log(err);
  } else {
    console.log("Connected to the Data-Base.");
  }
});

    // ---------------------------------------

app.set('view enginge', 'ejs');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/views'));
app.engine('ejs', engine_mate);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: mySecret.secretKey,
  store: new MongoStore({ url: mySecret.database , autoReconnect: true })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(mainRoutes);
app.use(userRoutes);


    // ---------------------------------------

          //       Code to use Postman
          // app.post('/create-user', function(req, res, next){
          //   var user = new User();
          //   user.profile.name = req.body.name;
          //   user.password = req.body.password;
          //   user.email = req.body.email;
          //   user.save(function(err){
          //     if(err) return next(err);
          //     res.json("Succesfully created a new user.")
          //   });
          // });


// app.get('/', function(req, res){
//   res.render('pages/00-index.ejs');
// });
//
// app.get('/1', function(req, res){
//   res.render('pages/01-one.ejs');
// });
//
// app.get('/2', function(req, res){
//   res.render('pages/02-two.ejs');
// });


    // ---------------------------------------

app.listen(mySecret.port, function(err){
  if(err){ throw err; }
  console.log("");
  console.log("Server Up and Running in port " + mySecret.port);
  console.log("");
  console.log("");
});
