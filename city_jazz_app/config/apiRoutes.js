// - apiRoutes
//   - In here we will define what should happen when requests are made to routes which begin with `/api`. The routes defined here will be for:
//     - restaurants
//     - register
//    - login
//
// - The functions which are executed in the routes file are defined in controllers, so let's build out our controllers next.

const express = require('express');
const router  = express.Router();

const authentications = require('../controllers/authentications');
const venues          = require('../controllers/venues');

// router.route('/register')
//   .post(authentications.register);
// router.route('/login')
//   .post(authentications.login);

router.route('venues')
  .get(venues.index);


module.exports = router;
