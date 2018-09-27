var express = require('express');
var router = express.Router();
var db = require('./db');

router.use('/', function(req, res, next) {
  console.log('Time:', Date.now());
  next();
});

/* GET all relations. */
router.get('/', function(req, res) {
  console.log(req.params);
  let userFind = `SELECT addr,referralAddress FROM UserInfo`;
  db.query(userFind, [], (err, result, fields) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
