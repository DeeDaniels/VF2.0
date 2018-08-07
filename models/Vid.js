
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var vid = new Schema({
  url: {
    type: String
  },
  startSec: {
    type: Number
  },
  endSec: {
    type: Number
  },
  date: {
    type: Number
  },
},{
    collection: 'Projects1'
});

module.exports = mongoose.model('Projects', vid);
