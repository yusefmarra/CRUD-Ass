var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Student = mongoose.model('students');

// GET all the things
router.get('/students/all', function(req, res) {
  Student.find(function(err, students) {
    if (!err) {
      res.statusCode = 200;
      res.json({students: students, code: 200});
    } else {
      res.json(err);
    }
  });
});

//Get student by id
router.get('/students/id/:id', function(req, res) {
  if (req.params.id) {
    var query = {'_id': req.params.id};
    Student.findOne(query, function(err, student) {
      if (!err) {
        res.statusCode = 200;
        res.json({student: student, code:200});
      }
    });
  } else {
    res.statusCode = 400;
    res.json({message:"You must provide an id", code: 400});
  }
});

//Post New Student
router.post('/students/add', function(req, res) {
  if (req.body.fName && req.body.lName && req.body.age) {
    // Has the minimun required fields
    if (req.body.smoker && req.body.isCool && req.body.lastIp) {
      // Has all possible fields
      new Student(req.body).save(function(err, student) {
        if (!err) {
          res.statusCode = 200;
          res.json({message: "Success!", student: student, code: 200});
        } else {
          res.json(err);
        }
      });
    } else {
      // Give Defaults for fields not provided
      new Student({
        fName: req.body.fName,
        lName: req.body.lName,
        age: req.body.age,
        smoker: false,
        isCool: false,
        lastIp: 999
      }).save(function(err, student) {
        if (!err) {
          res.statusCode = 200;
          res.json({message: "Success!", student: student, code: 200});
        } else {
          res.json(err);
        }
      });
    }
  } else {
    // Doesn't have the required fields
    res.statusCode = 400;
    res.json({message: "Must provide all required fields", code: 400});
  }
});



module.exports = router;
