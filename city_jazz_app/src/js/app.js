// console.log('app.js working');

// Above binds googleMap to this as an object
// Need to use OOP to put map on the web page...
// Map is an object
const googleMap = googleMap || {};
const google    = google;

// App.init



// Need to set up the map here - define center of map also, using latlng
googleMap.mapSetup = function() {
  console.log('running');
  // console.log(google);
  const canvas = document.getElementById('map-container');

  const mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
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
  this.addInfoWindowForVenue(venue, marker);
};

// Making window with info for venue etc..
googleMap.addInfoWindowForVenue = function(venue, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();

    this.infoWindow = new google.maps.InfoWindow({
      content:
      `<h1>${venue.name}</h1>
      <p>Phone: ${venue.phone}</p>
      <p>Address: ${venue.address}</p>
      <p>Price: ${venue.price}</p>
      <a href="${venue.info}">More Info</a>
      <br/>
      <br/>
      <iframe src="${venue.image}"></iframe>`
    });

    this.infoWindow.open(this.map, marker);
    this.map.setCenter(marker.getPosition());
    this.map.setZoom(15);
  });

};


$(googleMap.mapSetup.bind(googleMap));
