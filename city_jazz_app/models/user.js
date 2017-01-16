// - Let's first build the user.js file (as it is more complicated). Please do look carefully at the previous times you have used this file (particularly with your authentication homework)

// require dependancies needed for accessing mongodb and for password hashing
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const validator = require('validator');

// required input for user login
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }
});

// What does set do?
userSchema
.virtual('password')
.set(setPassword);

userSchema
.virtual('passwordConfirmation')
.set(setPasswordConfirmation);

userSchema
.path('passwordHash')
.validate(validatePasswordHash);

userSchema
.path('email')
.validate(validateEmail);

userSchema.methods.validatePassword = validatePassword;

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.passwordHash;
    delete ret.email;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);


// FUNCTIONS

// Setting the password (uses bcrypt for password hash) - converts virual into password hash
function setPassword(value){
  this._password    = value;
  this.passwordHash = bcrypt.hashSync(value, bcrypt.genSaltSync(8));
}

// Setting the password confirmations
function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
}

// validating passwordHash
function validatePasswordHash() {
  if (this.isNew) {
    if(!this._password) {
      return this.invalidate('password', 'A password is required.');
    }
    if (this._password.length < 6) {
      this.invalidate('password', 'must be at least 6 characters.');
    }
    if (this._password !== this._passwordConfirmation) {
      return this.invalidate('passwordConfirmation', 'Passwords do not match.');
    }
  }
}

function validateEmail(email) {
  if (!validator.isEmail(email)) {
    return this.invalidate('email', 'must be a valid email address');
  }
}

// validating password - comparing passwordhash to password
function validatePassword(passoword){
  return bcrypt.copmareSync(passoword, this.passwordHash);
}

// To limit jason output (any unnecessary...)
// Here we are black-listing the passwordHash, email and __v keys from our JSON output of our Mongoose object.
