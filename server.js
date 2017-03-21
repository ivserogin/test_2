const express = require ('express');
const path = require('path');
const bodyParser = require ('body-parser');

const index = require('./routes/index');
const tasks = require('./routes/tasks');

const app = express ();
const port = 8000;


// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');
app.engine('html',require('ejs').renderFile);

//Set static folder

app.use(express.static(path.join(__dirname,'client')));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', tasks);
  app.listen(port, function(){
    console.log("This app on " + port);
  });
