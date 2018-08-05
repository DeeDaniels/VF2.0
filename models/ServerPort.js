// ServerPort.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for ServerPort
const ServerPort = new Schema({
  name: {
    type: String
  },
  port: {
      type: Number
  }
},{
    collection: 'Project1'
});

module.exports = mongoose.model('ServerPort', ServerPort);
