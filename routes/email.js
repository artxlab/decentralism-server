var express = require('express');
var router = express.Router();
var db = require('./db');

router.use('/', function(req, res, next) {
  console.log('Time:', Date.now());
  next();
});

/* GET users listing. */
router.get('/:addr', function(req, res) {
  console.log(req.params);
  let userFind = `SELECT * FROM UserInfo WHERE address = ?`;
  db.query(userFind, [req.params.addr], (err, result, fields) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result[0]);
    }
  });
});

/* Create a userInfo record and save it into db*/
router.put('/', function(req, res) {
  console.log(req.body.addr);
  let userInsert = `INSERT INTO UserInfo(address, email) VALUES(?,?)`;
  db.query(userInsert, [req.body.addr,req.body.email], (err, result, fields) => {
    if (err) {
      var duplicateEntryMsg = req.body.email + ' has been used before, try another email address';
      res.json({'message' : duplicateEntryMsg});
    } else {
      res.send(result);
    }
  });
});

// Update email address
router.post('/', function(req, res) {
  console.log(req.body.addr);
  let userInsert = `UPDATE UserInfo SET email = ? WHERE address = ?`;
  db.query(userInsert, [req.body.email, req.body.addr], (err, result, fields) => {
    if (err) {
      var duplicateEntryMsg = req.body.email + ' has been used before, try another email address';
      res.json({'message' : duplicateEntryMsg});
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
