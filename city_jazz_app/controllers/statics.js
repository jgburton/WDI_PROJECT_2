// 	- then statics.js
//   		- here there is one function defined which loads up the index.html. This is executed as soon as the page initially loads (i.e. a GET request to the home url (e.g. http://localhost:3000))

module.exports = {
  home: staticsHome
};

const path = require('path');

function staticsHome(req, res){
  return res.sendFile(path.join(__dirname, '../index.html'));
}
