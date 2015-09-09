var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uriUtil = require('mongodb-uri');
// require('dotenv').load();

var mongooseURI = uriUtil.formatMongoose('mongodb://yusef:fuckyouchuck@ds051868.mongolab.com:51868/heroku_tk99p4xd');

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

mongoose.model('students', Student);
mongoose.connect('mongodb://yusef:fuckyouchuck@ds051868.mongolab.com:51868/heroku_tk99p4xd');
// ||'mongodb://'+process.env.username+':'+process.env.password+'@localhost/students');
