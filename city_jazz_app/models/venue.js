// 9. Models - REMEMBER `module.exports`. Also ensure you are requiring mongoose at the top of the files!
//
// 	2 models: user.js, restaurant.js
// 	- Let's first build the user.js file (as it is more complicated). Please do look carefully at the previous times you have used this file (particularly with your authentication homework)
//
// 	- Then create your restaurant model

const mongoose = require('mongoose');

const venueSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  image: { type: String, trim: true },
  Info: { type: String, trim: true },
  url: { type: String, trim: true },
  price: { type: String, trim: true }
});

module.exports = mongoose.model('Venue', venueSchema);
