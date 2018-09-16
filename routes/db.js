const mysql = require("mysql");

const pool = mysql.createPool({      // Create mysql instance
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'PLACEHOLER',
    database:'decentralism',
    multipleStatements:true
});

// Create connection pool
let query = (sql,options,callback) => {
    pool.getConnection((err,connection) =>{
        if (err) throw err; // connect failed
        connection.query(sql,options,(err,results,fields) =>{
            // release the connection back to pool
            connection.release();
            // call back functions
            callback(err,results,fields);
        });
    });
};

module.exports = {
  query
};
