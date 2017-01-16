"use strict";var googleMap=googleMap||{},google=google;googleMap.init=function(){this.apiUrl="http://localhost:3000/api",this.$modal=$(".modal-content"),$(".register").on("click",this.register.bind(this)),$(".login").on("click",this.login.bind(this)),$(".logout").on("click",this.logout.bind(this)),this.$modal.on("submit","form",this.handleForm),this.$modal.on("click",".close",this.repositionMap),this.mapSetup(),this.getToken()?this.loggedInState():this.loggedOutState()},googleMap.repositionMap=function(){setTimeout(function(){googleMap.map.panTo(new google.maps.LatLng(51.512178,(-.108369))),googleMap.map.setZoom(12)},1e3)},googleMap.loggedInState=function(){$(".loggedIn").show(),$(".loggedOut").hide()},googleMap.loggedOutState=function(){$(".loggedIn").hide(),$(".loggedOut").show()},googleMap.register=function(e){e&&e.preventDefault(),this.$modal.html('\n    <form method="post" action="/register">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Register</h4>\n      </div>\n      <div class="modal-body">\n        <div class="form-group">\n          <input class="form-control" type="text" name="user[username]" placeholder="Username">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="email" name="user[email]" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="user[password]" placeholder="Password">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">\n        </div>\n      </div>\n      <div class="modal-footer">\n        <input class="btn btn-primary" type="submit" value="Register">\n      </div>\n    </form>\n  '),$(".modal").modal("show")},googleMap.login=function(e){e&&e.preventDefault(),this.$modal.html('\n    <form method="post" action="/login">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Login</h4>\n      </div>\n      <div class="modal-body">\n        <div class="form-group">\n          <input class="form-control" type="email" name="email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="password" placeholder="Password">\n        </div>\n      </div>\n      <div class="modal-footer">\n        <input class="btn btn-primary" type="submit" value="Login">\n      </div>\n    </form>\n  '),$(".modal").modal("show")},googleMap.logout=function(e){e.preventDefault(),this.removeToken(),this.loggedOutState()},googleMap.handleForm=function(e){e.preventDefault();var o=""+googleMap.apiUrl+$(this).attr("action"),t=$(this).attr("method"),a=$(this).serialize();return googleMap.ajaxRequest(o,t,a,function(e){e.token&&googleMap.setToken(e.token),googleMap.loggedInState(),$(".modal").modal("hide")})},googleMap.ajaxRequest=function(e,o,t,a){return $.ajax({url:e,method:o,data:t,beforeSend:this.setRequestHeader.bind(this)}).done(a).fail(function(e){console.log(e)})},googleMap.setRequestHeader=function(e){return e.setRequestHeader("Authorization","Bearer "+this.getToken())},googleMap.setToken=function(e){return window.localStorage.setItem("token",e)},googleMap.getToken=function(){return window.localStorage.getItem("token")},googleMap.removeToken=function(){return window.localStorage.clear()},googleMap.mapSetup=function(){var e=document.getElementById("map-container"),o={zoom:12,center:new google.maps.LatLng(51.512178,(-.108369)),mapTypeId:google.maps.MapTypeId.ROADMAP,styles:[{featureType:"all",elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#000000"},{lightness:40}]},{featureType:"all",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#000000"},{lightness:16}]},{featureType:"all",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:17},{weight:1.2}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#000000"},{lightness:21}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:17}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:29},{weight:.2}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#000000"},{lightness:18}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#000000"},{lightness:16}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#000000"},{lightness:19}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#000000"},{lightness:17}]}]};this.map=new google.maps.Map(e,o),this.getVenues()},googleMap.getVenues=function(){$.get("http://localhost:3000/api/venues").done(this.loopThroughVenues)},googleMap.loopThroughVenues=function(e){$.each(e.venues,function(e,o){googleMap.createMarkerForVenue(o)})},googleMap.createMarkerForVenue=function(e){var o=new google.maps.LatLng(e.lat,e.lng),t=new google.maps.Marker({position:o,map:this.map});this.addModalForVenue(e,t)},googleMap.addModalForVenue=function(e,o){var t=this;google.maps.event.addListener(o,"click",function(){return googleMap.getToken()?($(".modal-content").html('\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">'+e.name+'</h4>\n      </div>\n      <div class="modal-body">\n        <img class="imageModal" src="'+e.image+'">\n        <p>Phone: '+e.phone+"</p>\n        <p>Address: "+e.address+"</p>\n        <p>Price: "+e.price+'</p>\n        <a href="'+e.info+'">More Info</a>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-primary">Save to Favourites</button>\n      </div>'),$(".modal").modal("show"),t.map.setCenter(o.getPosition()),void t.map.setZoom(15)):googleMap.login()})},$(googleMap.init.bind(googleMap));