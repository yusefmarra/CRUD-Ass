var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Student = new Schema(
  {
    fName: String,
    lName: String,
    age: Number,
    smoker: Boolean,
    isCool: Boolean,
    lastIp: Number
  }
);

mongoose.model('students', Student);
mongoose.connect('mongodb://localhost/students');
