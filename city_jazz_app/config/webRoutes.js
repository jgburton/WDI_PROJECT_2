// require express dependency and express router
const express = require('express');
const router  = express.Router();

// require pathway to contollers for statics and venues
const staticsController = require ('../controllers/statics');
const venuesController  = require ('../controllers/venues')

//For navigating the web app...
router.route('/')
  .get(staticsController.home);

router.route('/venues')
  .get(venuesController.index);

module.exports = router;
