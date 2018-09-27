var express = require('express');
var router = express.Router();
var db = require('./db');

router.use('/', function(req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// Update email address
router.post('/', function(req, res) {
  console.log(req.body.addr);
  let userInsert = `UPDATE UserInfo SET referralAddress = ? WHERE address = ?`;
  db.query(userInsert, [req.body.referralAddress, req.body.addr], (err, result, fields) => {
    if (err) {
      res.json({'message' : err});
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
