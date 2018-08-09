// VidRoutes.js

var express = require('express');
var app = express();
var VidRouter = express.Router();

// Require Vid model in our routes module
var Vid = require('../models/Vid');

// Defined store route
VidRouter.post( '/add/post', function (req, res) {
  var startMin = Number( req.body.reel.inputStartMin );
  var startSec = Number( req.body.reel.inputStartSec );
  var endMin   = Number( req.body.reel.inputEndMin );
  var endSec   = Number( req.body.reel.inputEndSec );

  var vid = new Vid({
    url: String( req.body.reel.url ),
    startSec: ( startMin * 60 ) + startSec,
    endSec: ( endMin * 60 ) + endSec,
    date: new Date().getTime()
  });

  console.log('formatted:');
  console.log( vid );
  vid.save()
    .then(vid => {
      res.json('Vid added successfully');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
VidRouter.get('/',function (req, res) {
  console.log('about to find vids')
  Vid.find().sort({ date: 1 }).exec( function (err, vid){
    if(err){
      console.log(err);
    }
    else {
      res.json(vid);
    }
  });
});

// Defined edit route
// vidRouter.route('/edit/:id').get(function (req, res) {
//   var id = req.params.id;
//   Vid.findById(id, function (err, Vid){
//       res.json(Vid);
//   });
// });

//  Defined update route
VidRouter.route('/update/:id').post(function (req, res) {
  VidPanel.findById(req.params.id, function(err, Vid) {
    if (!VidPanel)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      Vid.Vid = req.body.Vid;

      Vid.save().then(Vid => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
VidRouter.route('/delete/:id').get(function (req, res) {
  VidPanel.findByIdAndRemove({_id: req.params.id},
       function(err, Vid){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = VidRouter;
