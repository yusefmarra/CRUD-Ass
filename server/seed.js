var mongoose = require('mongoose');
var Student = mongoose.model('students');

var studentSeed = [
  {
    fName: 'Yusef',
    lName: 'Marra',
    email: 'blah@blah.com',
    smoker: true,
    isCool: true,
    lastIp: 55,
  },
  {
    fName: 'Dominic',
    lName: 'Muttel',
    email: 'blah@blah.com',
    smoker: true,
    isCool: true,
    lastIp: 59,
  },
  {
    fName: 'Robbie',
    lName: 'Fish',
    email: 'blah@blah.com',
    smoker: true,
    isCool: true,
    lastIp: 81,
  },
  {
    fName: 'Bradley',
    lName: 'Something',
    email: 'blah@blah.com',
    smoker: true,
    isCool: true,
    lastIp: 51,
  },
  {
    fName: 'Erik',
    lName: 'Whoknows',
    email: 'blah@blah.com',
    smoker: false,
    isCool: true,
    lastIp: 54,
  },
  {
    fName: 'Lucy',
    lName: 'Cifferelorsomething',
    email: 'blah@blah.com',
    smoker: false,
    isCool: true,
    lastIp: 61,
  },
  {
    fName: 'Michael',
    lName: 'Herman',
    email: 'blah@blah.com',
    smoker: false,
    isCool: false,
    lastIp: 24,
  },
];

function databaseSeed() {
  Student.find({}, function(err, students) {
    if (!err && students.length === 0) {
      studentSeed.forEach(function(student) {
        new Student(student).save(function(err, student){
          if (!err) {
            console.log("Seeded database with " + student.fName);
          } else {
            console.log(err);
          }
        });
      });
    }
  });
}

module.exports = databaseSeed;
