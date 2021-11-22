let express = require('express');
let app = express();
let ejs = require('ejs');
var fs = require('fs');
const port = process.env.PORT || 3000;

app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/.well-known/acme-challenge/pu-xAQgUOqiseeLl506GV2CZ4UeiPFcLnzH5nZI-x9U', (req, res) => {
  fs.readFile('/home/nodejs/domainchallenge.txt', (e, data) => {
    if (e) throw e;
    res.send(data);
  });
});

app.post('')

module.exports = app.listen(port);