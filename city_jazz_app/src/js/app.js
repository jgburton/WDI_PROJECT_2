// console.log('app.js working');

// Above binds googleMap to this as an object
// Need to use OOP to put map on the web page...
// Map is an object
const googleMap = googleMap || {};
const google    = google;

// Need to set up the map here - define center of map also, using latlng
googleMap.mapSetup = function() {
  console.log('running');
  console.log(google);
  const canvas = document.getElementById('map-container');

  const mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  this.map = new google.maps.Map(canvas, mapOptions);
};

$(googleMap.mapSetup.bind(googleMap));







// googleMap.mapSetup = function() {
//   const canvas = document.getElementById('map-canvas');
//
//   const mapOptions = {
//     zoom: 12,
//     center: new google.maps.LatLng(51.506178,-0.088369),
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };
//
//   this.map = new google.maps.Map(canvas, mapOptions);
//   this.getCameras();
// };
