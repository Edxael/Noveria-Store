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
var Category = require('./models/category.js');



    // ---------------------------------------

mongoose.connect( mySecret.database , function(err){
  if(err){
    console.log(err);
  } else {
    console.log("Connected to the Data-Base.");
  }
});


    // ---------------------------------------


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
app.use(function(req, res,next){
  res.locals.user = req.user;
  next();
});

app.use(function(req, res, next) {
  Category.find({}, function(err, categories) {
    if (err) return next(err);
    res.locals.categories = categories;
    next();
  });
});


app.set('view engine', 'ejs');


var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/ruser.js');
var adminRoutes = require('./routes/admin.js');
var apiRoutes = require('./api/api');

app.use(mainRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use('/api', apiRoutes);




    // ---------------------------------------

app.listen(mySecret.port, function(err){
  if(err){ throw err; }
  console.log("");
  console.log("Server Up and Running in port " + mySecret.port);
  console.log("");
  console.log("");
});
