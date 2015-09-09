var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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

mongoose.model('students', Student);
mongoose.connect('mongodb://heroku_tk99p4xd:qjvb67trn21d3apoosio69lvrq@ds051868.mongolab.com');
// ||'mongodb://'+process.env.username+':'+process.env.password+'@localhost/students');
