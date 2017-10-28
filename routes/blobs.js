const express = require('express');
const mongoose = require('mongoose'); // monogo connection
const bodyParser = require('body-parser'); // parses information from POST
const methodOverride = require('method-override'); // used to manipulate POST

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// build the REST operations at the base for blobs

// this will be accessible from http://127.0.0.1:3000/blobs if the
// default route for / is left unchanged

router.route('/')
  // GET all blobs
  .get(function(req, res, next) {
    // retrieve all blobs from Mongo
    mongoose.model('Blob').find({}, function(err, blobs) {
      if (err) {
        return console.error(err);
      } else {
        // respond to both HTML and JSON. JSON responses require
        // 'Accept: application/json;' in the Request Header
        res.format({
          // HTML response will render the index.jade file in the
          // views/blobs folder. We are also setting "blobs" to be an
          // accessible variable in our jade view
          html: function() {
            res.render('blobs/index', {
              title: 'All my Blobs',
              "blobs" : blobs
            });
          },
          // JSON response will show all blobs in JSON format
          json: function() {
            res.json(infophotos);
          }
        });
      }
    });
  })
  // POST a new blob
  .post(function(req, res) {
    // Get values from POST request. TODO FILL THIS IN
    var name = req.body.name;
    var badge = req.body.badge;
    var dob = req.body.dob;
    var company = req.body.company;
    var isLoved = req.body.isLoved;
    // call the create function for our database
    mongoose.model('Blob').create({
      name : name,
      badge : badge,
      dob : dob,
      isLoved : isLoved
    }, function(err, blob) {
        if (err) {
          res.send("There was a problem adding the information to the database.");
        } else {
          // Blob has been created
          console.log('POST creating new blob: ' + blob);
          res.format({
            // HTML response will TODO
            html: function() {
              // If it worked TODO
              res.location("blobs");
              // And forward to success page
              res.redirect("/blobs");

            },
            // JSON response will show the newly created blob
            json: function() {
              res.json(blob);
            }
          });
        }
    })
  });
