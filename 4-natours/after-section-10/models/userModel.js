const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
// todo 1: create a userModel, then add route to handle post /signup
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'], // limit input
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  passwordChangedAt: Date,
  // reset password
  passwordResetToken: String,
  passwordResetExpires: Date,
  // ....
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

// todo 2: hasing password
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// method for Update changedPasswordAt property for the user
userSchema.pre('save', function(next) {
  // this.isNew  = if this document is new
  if (!this.isModified('password') || this.isNew) return next();

  // have a flaw : sometime saving to db is bit slower than issue the JWT
  // make it so that the change password timestamp is a bit after then JWT create timestamp
  // so currentUser.changedPasswordAfter(decoded.iat) will return true;
  // fix that flaw : make sure token has been create after password has been changed
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});



// todo : check password is correct, return True or False
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// JWTTimestamp = when the token was issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  // this = current Document
  // add field for the data where the password has been changed
  // if user don't change password, the this.passwordChangedAt don't exist
  if (this.passwordChangedAt) {
    // convert data to timestamp
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
// 100 < 200 change password after token was issued -> true
    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};
// resetToken is simple a random string, use build-in crypto module
userSchema.methods.createPasswordResetToken = function() {
  // 1. generate token, behavior as a reset password
  // 32 -> number of character
  // hex -> convert it to a hex string
  const resetToken = crypto.randomBytes(32).toString('hex');

  // 2. build-in crypto module to hash this resetToken
  // save it to db, so can compare with user privide
  this.passwordResetToken = crypto
    .createHash('sha256') //algorithm to hash
    .update(resetToken) // variable where token is stored  = datat that want to encrypt
    .digest('hex'); //

  console.log({ resetToken }, this.passwordResetToken);

  // set token expire
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // return plain resetToken to send to user's email
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
