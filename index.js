const express = require('express');
const bodyParser = require('body-parser');
var code = require('./routes/code');
var email = require('./routes/email');
var saveReferral = require('/routes/saveReferral');
// initialize our express app
const app = express();

var port = 3579;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
app.use('/code', code);
app.use('/register', email);
app.use('/referral', saveReferral);

module.exports = app;
