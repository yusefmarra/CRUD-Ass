var express = require('express');
var apiRouter = express.Router();
var mongoose = require('mongoose');
var Student = mongoose.model('students');
var User = mongoose.model('users');
var jwt = require('jsonwebtoken');


apiRouter.post('/authenticate', function(req, res) {
  if (req.body.name && req.body.password) {
    User.findOne({name: req.body.name}, function(err, user) {
      if (err) {
        console.log(err);
        res.statusCode = 400;
        res.json({message: "Authentication Failed. Some kinda error.", code: 400, err: err});
      }
      if (!user) {
        res.statusCode = 404;
        res.json({message: "Authentication Failed. User not found", code:404});
      } else {

        user.comparePassword(req.body.password, function(err, match) {
          if (!err) {
            if (match) {
              var token = jwt.sign(user, process.env.secret, {
                expiresInMinutes: 1440,
              });
              res.statusCode = 200;
              res.json({
                message: "Authentication succeeded.",
                token: token,
                code: 200
              });
            } else {
              res.statusCode = 403;
              res.json({
                message: "Authentication failed. Wrong password.",
                code: 403
              });
            }
          } else { throw err; }
        });

        // if (user.password === req.body.password) {

        // } else {
        //   res.statusCode = 400;
        //   res.json({
        //     message: "Authentication Failed. Wrong password",
        //     code: 400
        //   });
        // }
      }
    });
  } else {
    res.statusCode = 400;
    res.json({message: "You must provide all fields", code: 400});
  }
});





// GET all the students
apiRouter.get('/student/all', function(req, res) {
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
apiRouter.get('/student/:id', function(req, res) {
  if (req.params.id) {
    var query = {'_id': req.params.id};
    Student.findOne(query, function(err, student) {
      if (!err) {
        res.statusCode = 200;
        res.json({student: student, code: 200});
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

apiRouter.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.secret, function(err, decoded) {
      if (!err) {
        req.decoded = decoded;
        next();

      } else {
        res.statusCode = 403;
        res.json({
          message: "No token provided",
          code: 403
        });
      }
    });
  } else {
    res.statusCode = 403;
    res.json({
      message: "No token provided.",
      code: 403
    });
  }
});


//Post New Student
apiRouter.post('/student/add', function(req, res) {
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
    res.json({message: "You must provide all required fields", code: 400});
  }
});

apiRouter.put('/student/:id', function(req, res) {
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

apiRouter.delete('/student/:id', function(req, res) {
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
    res.json({message: "You must provide an Id", code: 400});
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

module.exports = apiRouter;

// use token to look up user
// on user document, boolean that checks admin.
