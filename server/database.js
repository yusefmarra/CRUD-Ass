var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
// require('dotenv').load();


var Student = new Schema(
  {
    fName: String,
    lName: String,
    email: String,
    smoker: Boolean,
    isCool: Boolean,
    lastIp: Number
  }
);

var User = new Schema (
  {
    name: { type:String, required:true, index:{ unique:true } },
    password: { type:String, required:true },
    admin: { type:Boolean, required:false }
  }
);

User.pre('save', function(next) {
  var user = this;

  // if (!user.isModified('password')) {
  //   return next();
  // }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (!err) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (!err) {
          user.password = hash;
          next();
        } else { return next(err); }
      });
    } else { return next(err); }
  });
});

User.methods.comparePassword = function(inputPassword, cb) {
  bcrypt.compare(inputPassword, this.password, function(err, match) {
    if (err) { return cb(err); }
    else {
      cb(null, match);
    }
  });
};

mongoose.model('users', User);
mongoose.model('students', Student);
// mongoose.connect('mongodb://'+process.env.username+':'+process.env.password+'@ds051868.mongolab.com:51868/heroku_tk99p4xd');
mongoose.connect('mongodb://'+process.env.username+':'+process.env.password+'@localhost/students');
