var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;



    // Create user schema to send to database.
var UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  profile: {
    name: { type: String, default: 'no-name'},
    picture: { type: String, default: 'no-pic' }
  },
  address: String,
  history: [{
    date: Date,
    paid: { type: Number, default: 0 }
  }]
});



    // Encrypt the password using bcrypt-nodejs
UserSchema.pre('save', function(next){
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt){
    if(err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });

});



    // Compare password from user to password in Data-Base:
UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
}



    // Exporting the schema
module.exports = mongoose.model('User', UserSchema);
