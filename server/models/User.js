const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  houseNumber: {
    type: String,
    default: ''
  },
  streetName: {
    type: String,
    default: ''
  },
  addressType: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  isDeleted: {
      type: Boolean,
      default: false
  }
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  module.exports = mongoose.model('User', UserSchema);
