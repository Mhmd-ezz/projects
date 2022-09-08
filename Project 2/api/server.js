var port = process.env.PORT || 3000;
var express = require('express');
//requiring path and fs modules
const path = require('path');
const fs = require('fs');

var app = express();

app.get('/', function(req, res) {

  //joining path of directory 
  const root = __dirname;
  const dist = path.join(__dirname, 'dist');
  let fileNames = [];
  //passsing directoryPath and callback function
  fs.readdir(dist, function(err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    //listing all files using forEach
    files.forEach(function(file) {
      // Do whatever you want to do with the file
      console.log(file);
      fileNames.push(file);
    });
    res.send({
      "Output": "Hello World!",
      "CurrentDirectory": path.dirname(__dirname),
      "Files": fileNames
    });
  });
});

app.post('/', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});

app.listen(port);
module.exports = app;
