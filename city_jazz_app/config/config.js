// I need a better explanation on this? What is secret for? For the jwt token?
module.exports = {
  port: process.env.PORT || 3000,
  db: 'mongodb://localhost/city_jazz_app',
  secret: process.env.SECRET || 'This is secret'
  //  For the jwt token?
};
