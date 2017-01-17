// console.log('googleMap.js working');

// Above binds googleMap to this as an object
// Need to use OOP to put map on the web page...
// Map is an object
const googleMap = googleMap || {};
const google    = google;

// googleMap.init
// first task to fire after window onload
googleMap.init = function() {
  this.apiUrl = 'http://localhost:3000/api';
  this.$modal = $('.modal-content');
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.findme').on('click', this.whereAmI.bind(this));
  this.$modal.on('submit', 'form', this.handleForm);
  $('body').on('click', '.refreshMarkers', this.repositionMap);
  // this.$modal.on('hidden', this.repositonMap);

  this.mapSetup();

  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

googleMap.repositionMap = function(){
  console.log('firing');
  setTimeout(function(){
    googleMap.map.panTo(new google.maps.LatLng(51.512178,-0.108369));
    googleMap.map.setZoom(12);
  }, 200);
};



googleMap.loggedInState = function(){
  $('.loggedIn').show();
  $('.loggedOut').hide();
  $('#map-container').removeClass('blurry');
  this.getVenues();
  // this.whereAmI();
};

googleMap.loggedOutState = function(){
  $('.loggedIn').hide();
  $('.loggedOut').show();
  this.register();
  $('#map-container').addClass('blurry');
};

//AUTHENTICATION
// Register Function - using a modal
googleMap.register = function(e){
  if (e) e.preventDefault();
  this.$modal.html(`
    <form method="post" action="/register">
    <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">Register</h4>
    </div>
    <div class="modal-body">
    <div class="form-group">
    <input class="form-control" type="text" name="user[username]" placeholder="Username">
    </div>
    <div class="form-group">
    <input class="form-control" type="email" name="user[email]" placeholder="Email">
    </div>
    <div class="form-group">
    <input class="form-control" type="password" name="user[password]" placeholder="Password">
    </div>
    <div class="form-group">
    <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
    </div>
    </div>
    <div class="modal-footer">
    <input class="btn btn-primary" type="submit" value="Register">
    </div>
    </form>
    `);
  $('.modal').modal('show');
  };

  // Login Function - using a modal
  googleMap.login = function(e) {
    if (e) e.preventDefault();
    this.$modal.html(`
      <form method="post" action="/login">
      <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <h4 class="modal-title">Login</h4>
      </div>
      <div class="modal-body">
      <div class="form-group">
      <input class="form-control" type="email" name="email" placeholder="Email">
      </div>
      <div class="form-group">
      <input class="form-control" type="password" name="password" placeholder="Password">
      </div>
      </div>
      <div class="modal-footer">
      <input class="btn btn-primary" type="submit" value="Login">
      </div>
      </form>
      `);
      $('.modal').modal('show');
    };

    googleMap.logout = function(e){
      e.preventDefault();
      this.removeToken();
      this.loggedOutState();
    };

    // Function for handelling the form of registration, this must process and save the inputed data.
    googleMap.handleForm = function(e){
      e.preventDefault();

      const url    = `${googleMap.apiUrl}${$(this).attr('action')}`;
      const method = $(this).attr('method');
      const data   = $(this).serialize();

      return googleMap.ajaxRequest(url, method, data, data => {
        if (data.token) googleMap.setToken(data.token);
        googleMap.loggedInState();
        $('.modal').modal('hide');
      });
    };

    googleMap.ajaxRequest = function(url, method, data, callback){
      return $.ajax({
        url,
        method,
        data,
        beforeSend: this.setRequestHeader.bind(this)
      })
      .done(callback)
      .fail(data => {
        console.log(data);
      });
    };

    googleMap.setRequestHeader = function(xhr) {
      return xhr.setRequestHeader('Authorization', `Bearer ${this.getToken()}`);
    };

    googleMap.setToken = function(token){
      return window.localStorage.setItem('token', token);
    };

    googleMap.getToken = function(){
      return window.localStorage.getItem('token');
    };

    googleMap.removeToken = function(){
      return window.localStorage.clear();
    };

    // MAP - attempting to add geo location lones 157-162
    // Need to set up the map here - define center of map also, using latlng
    googleMap.mapSetup = function() {

      const canvas = document.getElementById('map-container');
      const mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(51.512178,-0.108369),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
      };
      this.map = new google.maps.Map(canvas, mapOptions);
      // this.getVenues();

      // console.log(google);
    };

    googleMap.whereAmI = function(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          const latlng = new google.maps.LatLng(pos.lat, pos.lng);

          const icon = {
            url: '../images/user_on_map_2_small.png',
            scaledSize: new google.maps.Size(60,60)
          };

          new google.maps.Marker({
            position: latlng,
            map: googleMap.map,
            animation: google.maps.Animation.DROP,
            icon: icon

          });

          new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: googleMap.map,
            center: latlng,
            radius: 3000
          });
        });
      }
    };

    // A little confused here....

    // get venues from yelp API? //error hgoogleMapening here...
    googleMap.getVenues = function() {
      $.get('http://localhost:3000/api/venues').done(this.loopThroughVenues);
    };

    googleMap.loopThroughVenues = function(data) {
      $.each(data.venues, (index, venue) => {
        setTimeout(function() {
          googleMap.createMarkerForVenue(venue);
        },
        index * 100);
      });
    };

      // create markers on map for the venues via lat/long?
      // const icon = {
      //   url: '../images/user_on_map_2_small.png',
      //   scaledSize: new google.maps.Size(60,60)
      // };


      googleMap.createMarkerForVenue = function(venue) {
        const latlng = new google.maps.LatLng(venue.lat, venue.lng);
        const icon = {
          url: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1882-200.png',
          scaledSize: new google.maps.Size(50,50)
        };

        const marker = new google.maps.Marker({
          map: googleMap.map,
          animation: google.maps.Animation.DROP,
          icon: icon,
          position: latlng,
          map: this.map

        });
        this.addModalForVenue(venue, marker);
      };



      //
      // new google.maps.Marker({
      //   position: latlng,
      //   map: googleMap.map,
      //   animation: google.maps.Animation.DROP,
      //   icon: icon


      // Replaced infowindow with a modal for info for venue as it looks much slicker
      googleMap.addModalForVenue = function(venue, marker) {
        google.maps.event.addListener(marker, 'click', () => {
          if (!googleMap.getToken()) return googleMap.login();

          $('.modal-content').html(`
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">${venue.name}</h4>
            </div>
            <div class="modal-body">
            <img class="imageModal" src="${venue.image}">
            <p>Phone: ${venue.phone}</p>
            <p>Address: ${venue.address}</p>
            <p>Price: ${venue.price}</p>
            <a href="${venue.info}">More Info</a>
            </div>
            <div class="modal-footer">
            <a href="https://citymapper.com/directions?endcoord=51.560555%2C-0.074077&endaddress=${venue.address}" target="_blank"><img src="/images/citymapper.png"></a>
            </div>`);

            $('.modal').modal('show');
            this.map.setCenter(marker.getPosition());
            this.map.setZoom(15);
          });
          // this.map.setZoom(12); figure out how to change soom when clicking out of modal? and save favorites? add city mapper?
        };

        // googleMap.geoLocationOfUser = function(venue) {
        //   if (navigator.geolocation) {
        //             navigator.geolocation.getCurrentPosition(function(position) {
        //               var pos = {
        //                 lat: position.coords.latitude,
        //                 lng: position.coords.longitude
        //               };
        // }
        // Loading the page binding this to the object googleMap
        $(googleMap.init.bind(googleMap));
