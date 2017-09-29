let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let Models = require('../config/constants').models
let bcrypt = require('bcryptjs')
const SALT_FACTOR = 10

let schema = new Schema({
  username: { type: String, required: true, unique: true, dropDups: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  streetAddress: {type: String, required: true, unique: true, dropDups: true },
  city: { type: String, required: true },
  continentalState: { type: String, required: true },
  zipCode: { type: Number, required: true }
})


schema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    } else {
      bcrypt.hash(user.password, salt, function (err, hash) {
        user.password = hash;
        next();
      });
    }
  });
});

schema.methods.validatePassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err || !isMatch) {
        return reject(err);
      }
      return resolve(isMatch);
    });
  })
};

module.exports = mongoose.model('User', schema)