// require express dependency and express router
const express = require('express');
const router  = express.Router();

// require pathway to contollers for statics and venues
const staticsController = require('../controllers/statics');

//For navigating the web app...
// home
router.route('/')
.get(staticsController.home);

module.exports = router;
