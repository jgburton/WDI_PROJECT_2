
// STILL HAVE TO USE JWT TOKENS


// 	- authentications.js
//     	- this will have two functions:
//      	 	- authenticationsLogin (exported as login)
//       		- authenticationsRegister (exported as register)

// TO DO AFTER READING NOTES...

// Exporting register and login functions
module.exports = {
  register: authenticationsRegister,
  login: authenticationsLogin
};

// require user model - refer to this
const User   = require('../models/user');
const jwt    = require('jsonwebtoken');
const config = require('../config/config');

// what do req and res do? Function for register
// req is an object containing information about the HTTP request that raised the event. In response to req, you use res to send back the desired HTTP response.
function authenticationsRegister(req, res){
  console.log(req);
  User.create(req.body.user, (err, user) => {
    if (err) return res.status(500).json({ messge: 'Something went wrong'});

    const token = jwt.sign(user._id, config.secret, { expiresIn: 60*60*24 });

    return res.status(201).json({
      message: `Welcome ${user.username}!`,
      user,
      token
    });
  });
}


// ABOVE
// 1. Try to create a user with the details (`req.body.user`)
// 2. Unless something has gone wrong, we will create the user
// 3. Inside the user model however, the users' password and passwordConfirmation will be validated and their password hashed by bcrypt and saved to the database.

// function for login - TO DO
function authenticationsLogin(req, res){
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!user || !user.validatePassword(req.body.password)) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    const token = jwt.sign(user._id, config.secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      message: 'Welcome back.',
      user,
      token
    });
  });
}

//ABOVE
// 1.We are looking to see if there is a user with this email address (req.body.email)
// 2.Then we are using the userSchema method to check if they have been given a valid password (req.body.password)
// 3.If they have provided us the correct details, then confirm that they have logged in correctly!
