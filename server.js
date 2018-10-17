// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var tungus = require('tungus');
var mongoose = require('mongoose')
mongoose.connect('tingodb://'+__dirname+'/data', function (err) {
  // if we failed to connect, abort
  if (err) throw err;

  // we connected ok
//   createData();
})

var Ticket     = require('./models/ticket');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/tickets')
  .post(function(req, res) {
      var ticket = new Ticket();
      ticket.name = req.body.name;
      ticket.content = req.body.content;
      ticket.save(function(err){
          if (err) res.send(err);
          res.json({message: 'Ticket created!'});
      });
  })
  .get(function(req, res) {
    Ticket.find(function(err, tickets) {
        if (err)
            res.send(err);

        res.json(tickets);
    });
  });

  router.route('/tickets/:ticket_id')

  // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
  .get(function(req, res) {
      Ticket.findById(req.params.ticket_id, function(err, ticket) {
          if (err)
              res.send(err);
          res.json(ticket);
      });
  });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);



