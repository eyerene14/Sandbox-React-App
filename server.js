const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT

app.use(express.static(path.join(__dirname, '')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '', 'index.html'))
});

//app.use(express.static(path.join(__dirname, 'build')));
//app.use(express.static(path.join(__dirname, '/users')), sqlConnect);

var server  = app.listen(port, () => console.log('Api listening on ', server.address().port));
module.exports = server