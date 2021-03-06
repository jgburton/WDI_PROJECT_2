// Controllers - REMEMBER `module.exports` at the bottom of each file! Also ensure you are requiring the correct modules/files at the top of each controller!

// 	- Given that in these controllers, I am referring to the User model (for login and reigster) and the Restaurant model, I would now look to build out these models files.

const Venue = require('../models/venue');

function venuesIndex(req, res) {
  Venue.find((err, venues) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json({ venues });
  });
}

module.exports = {
  index: venuesIndex
};
