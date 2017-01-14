// console.log('app.js working');

// Above binds googleMap to this as an object
// Need to use OOP to put map on the web page...
// Map is an object
const googleMap = googleMap || {};
const google    = google;

// Need to set up the map here - define center of map also, using latlng
googleMap.mapSetup = function() {
  console.log('running');
  // console.log(google);
  const canvas = document.getElementById('map-container');

  const mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  this.map = new google.maps.Map(canvas, mapOptions);
  this.getVenues();
};

// A little confused here....

// get venues from yelp API?
googleMap.getVenues = function() {
  console.log('reached');
  $.get('http://localhost:3000/api/venues').done(this.loopThroughVenues);
};

googleMap.loopThroughVenues = function(data) {
  $.each(data.venues, (index, venue) => {
    googleMap.createMarkerForVenue(venue);
  });
};

// create markers on map for the venues via lat/long?
googleMap.createMarkerForVenue = function(venue) {
  const latlng = new google.maps.LatLng(venue.lat, venue.lng);
  const marker = new google.maps.Marker({
    position: latlng,
    map: this.map
  });

  // this.addInfoWindowForCamera(venue, marker);
};

// googleMap.addInfoWindowForVenue function

$(googleMap.mapSetup.bind(googleMap));
