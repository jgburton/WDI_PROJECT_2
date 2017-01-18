
const rp = require('request-promise');
const mongoose = require('mongoose');
const Venue = require('../models/venue');
const databaseUrl = require('../config/config').db;

mongoose.connect(databaseUrl);
Venue.collection.drop();

const options = {
  uri: 'https://api.yelp.com/v3/businesses/search?location=london&categories=jazzandblues&limit=50',
  headers: {
    'Authorization': 'Bearer _pcOBAeOtgFajv0cPq4JVfzdOvN5OY03HzBtVkLIBF-Xwl4ohfEASvu4RnyqnQL_Da2nbziSZUzbz3pUiczUwpcOL99LBR3DmVgMasXrB-A6oaBiDiSTlm09pGd3WHYx'
  },
  json: true // Automatically parses the JSON string in the response
};

rp(options)
.then(data => {
  data.businesses.forEach(venue => {
    // console.log(venue);
    const newVenue =  new Venue({
      name: venue.name,
      phone: venue.phone,
      address: venue.location.display_address,
      price: venue.price,
      image: venue.image_url,
      info: venue.url,
      lng: venue.coordinates.longitude,
      lat: venue.coordinates.latitude
    });

    newVenue.save((err, venue) => {
      // to handle error - lang was missing
      if (err) return console.log(err);
      console.log(`${venue.name} was created`);
    });
  });
});


// data.forEach(place => {
//   Place.create(place, (err, place) => {
//     console.log(`${place.name} was created`);
//   });
// });



// $.ajax({
//   url: 'https://api.yelp.com/v3/businesses/search?location=london&categories=jazzandblues&limit=50',
//   method: 'GET',
//   beforeSend: function(request) {
//     request.setRequestHeader('Authorization', 'Bearer _pcOBAeOtgFajv0cPq4JVfzdOvN5OY03HzBtVkLIBF');
//   }
// }).done( data => {
//   console.log(data);
// });

// 10. Seeds
// 	- WE ARE NOT GOING TO FULLY BUILD OUT SEEDS YET! Just a couple of examples to test.
//
// 	- IMPORTANTLY - we are first going to create/register a user. So let's build out a user object with email, username, password, passwordConfirmation etc (corresponding with the model) and then save it with either .save or .create.
//
// 	- Let's now create a Restaurant. Let's build out a restaurant object corresponding to the model and then save it in the database using either .save or .create.
//
// 	- Once you have run the seeds file (creating the User and the Restaurant), go into Insomnia and do the GET request to retrieve all the users and see that it is working. In this case it would be a GET to 'http://localhost:3000/api/users'. If working, do the following:
//     	- Copy the token returned.
//     	- Go to the headers section of Insomnia, and set 'Authorization' to 'Bearer (+the token you just copied)'
// 	- This now means that you have a valid token in the header of your request, you can therefore do API calls for the restaurants and not get an 'Unauthorized' response.
//
// 	- So... now try to get all your restaurants listed out in Insomnia (i.e. http://localhost:3000/api/restaurants) to see that the restaurant seeded was created properly and that you can retrieve it as well.
//
//
// ---
//
// **Huzzah!** We have set up our API, seeded in one user and one instance of our main resource. This means we can now build out a more robust seeds file, then move on to start building the front end of our application.
