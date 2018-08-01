const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
//Added bodyParser
const bodyParser = require('body-parser');


// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

  // Added a closing )
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index')
});

app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
//Added missing ) and }
});

// Replaced get wih post, also / was missing
app.post('/favorites', function(req, res){
  if(!req.body.Title || !req.body.imdbID){
    res.send("Error");
    return
  }
  var data = JSON.parse(fs.readFileSync('./data.json'));
  console.log('req.body')
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

// added listen
app.listen(3000, function(){
  console.log("Listening on port 3000");
});
