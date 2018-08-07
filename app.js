var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');



// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://deeAdmin1:abcdefg1@ds111492.mlab.com:11492/allvids')
    .then(() => { // if all is ok we will be here
      console.log('Start');
    })
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

// Required application specific custom router module
var VidRouter = require('./routes/VidRouter');

// Use middlewares to set view engine and post json data to the server
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/Vids', VidRouter);

// Start the server
app.listen(port, function(){
  console.log('Server is running on Port: ',port);
});
