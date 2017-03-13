# WDI PROJECT 2
This is my second project for the Web Development Immersive bootcamp at General Assembly.
<br>

## GA WDI Project 2
 
## City Jazz - Maps API

For the second project on WDI I built a map based application to locate jazz venues in London. This was achieved by integrating the google maps API and a yelp API for the venue data.

![](http://i.imgur.com/sO10nUc.png)

## Technology

The technology stack used consists of an RESTfull Express back-end, MongoDB database and a mixture of jQuery and JavaScript on the front end. The full list of dependencies can be found in```package.json```. 

###Approach to the build of City Jazz: <br>
1. Set up the map using the Google Maps API after requesting an API key. Then determine the coordinates for the center of the map, make equilivalent to central London. <br>
2. Find data needed and determine if seeds would have to be hard coded or if there was a suitible API. <br>
3. Integrate the API into my map, using Insomnia to view the form of objects provided and select what data was required.<br>
4. Saving the relevant data to my MongoDB.
5. Set up markers on the map to indicate locations of jazz venues in London.<br>
6. Setting up modals and information within each modal in correspondence with the marked venue.
7. Adding the City Mapper widget to the modals to get the user to the jazz venue.
8. Authentication coding and set up. Managing logged in and logged out states. Restricting access to the map and clearing of markers.<br>
9. Styling/design and aditional animations.<br>

###The completed game is deployed on Heroku:
https://city-jazz.herokuapp.com

###Wins
It was my first experience using API's, understanding them conceptually and implementing two into the project. Additionaly using MongoDB as a database and implemetning authentication for users.

###Future Improvements: <br>
I'd like to implement new locations, worldwide and have a number of maps with different central coordinates within the app. Ideally Tokyo, Singapore, Hong Kong, Paris and New York City. This would make it an ideal app to use for people taking trips to major cities who enjoy live jazz.

I'd also like to populate the modals with more relevant information, potentially listing what is on that evening and prices of tickets/booking information.

Otherwise, having directions to the venue displayed and animated within the app rather than using a city mapper widget would be a key improvement.

