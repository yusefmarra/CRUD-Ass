var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Student = mongoose.model('students');
var User = mongoose.model('users');
var jwt = require('jsonwebtoken');

// GET all the things
router.get('/student/all', function(req, res) {
  Student.find(function(err, students) {
    if (!err) {
      res.statusCode = 200;
      res.json({students: students, code: 200});
    } else {
      console.log(err);
      res.json(err);
    }
  });
});

//Get student by id
router.get('/student/:id', function(req, res) {
  if (req.params.id) {
    var query = {'_id': req.params.id};
    Student.findOne(query, function(err, student) {
      if (!err) {
        res.statusCode = 200;
        res.json({student: student, code:200});
      } else {
        if (err.kind === "ObjectId") {
          res.statusCode = 404;
          res.json({
            message: "Could not find student matching id: " + err.value,
            code: 404
          });
        }
      }
    });
  } else {
    res.statusCode = 400;
    res.json({message:"You must provide an id.", code: 400});
  }
});

//Post New Student
router.post('/student/add', function(req, res) {
  var body = validateBody(req.body);
  if (body) {
    new Student(body).save(function(err, student) {
      if (!err) {
        res.statusCode = 200;
        res.json({message: 'success', code: 200, student: student});
      } else {
        console.log(err);
        res.json(err);
      }
    });
  } else {
    res.statusCode = 400;
    res.json({message: "You must provide all required fields", code:400});
  }
});

router.put('/student/:id', function(req, res) {
  if (req.params.id) {
    var body = validateBody(req.body);
    if (body) {
      var query = {'_id': req.params.id};
      Student.findOneAndUpdate(query, body, 'true', function(err, student) {
        if (!err) {
          res.statusCode = 200;
          res.json({message:"Success.", code: 200, student: student});
        } else {
          console.log(err);
          res.json(err);
        }
      });
    } else {
      res.statusCode = 400;
      res.json({message: "You must provide all required fields", code:400});
    }
  } else {
    res.statusCode = 400;
    res.json({message: "You must provide an ID", code: 400});
  }
});

router.delete('/student/:id', function(req, res) {
  if (req.params.id) {
    var query = {"_id": req.params.id};
    Student.findOneAndRemove(query, function(err, student) {
      if(!err) {
        res.json({message: "Successfully deleted.", student: student});
      } else {
        console.log(err);
        res.json(err);
      }
    });
  } else {
    res.statusCode = 400;
    res.json({message: "You must provide an Id", code:400});
  }
});

function validateBody(body) {
  if (body.fName && body.lName && body.email) {
    // Has the minimun required fields
    if (body.smoker && body.isCool && body.lastIp) {
      // Has all possible fields
      return body;
    } else {
      //Give defaults to optional fields
      body.smoker = false;
      body.isCool = false;
      body.lastIp = 999;
      return body;
    }
  } else {
    // Not valid, return false
    return false;
  }
}

module.exports = router;
