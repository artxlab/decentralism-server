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
      res.send(err);
    } else {
      res.send(result[0]);
    }
  });
});

/* Create a generate code function and save it into db*/
router.post('/', function(req, res) {
  console.log(req.body.addr);
  let userUpdate = `UPDATE UserInfo SET code = ? WHERE address = ?`;

  var code;
  queryWithRetry(userUpdate, req, (err, referCode) => {
    if(err) {
      res.send(err);
    }else{
      code = referCode;
      res.json({'referCode' : code });
    }
  });
  // console.log(success);
});

function queryWithRetry(userUpdate, req, callback) {
  var cnt = 0;

  function query(userUpdate, req) {
    cnt++;
    let referCode = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
    // referCode = 'kchhbr';
    db.query(userUpdate, [referCode, req.body.addr], (err, result, fields) => {
      if (err) {
        if(cnt == 5) {
          callback(err, null);
        }else {
          console.log("retry again");
          query(userUpdate, req);
        }
      } else {
        callback(null, referCode);
      }
    });
  };

  query(userUpdate, req);
}

module.exports = router;
