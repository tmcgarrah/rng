let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// let bcrypt = require('bcrypt');
// let SALT_WORK_FACTOR = 10;

let userSchema = new Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  favorite: {
    boynames: [],
    girlnames: [],
    syllablenames: [],
    wordnames: []
  }
});

// userSchema.pre('save', (next) => {
//   let user = this;
//
//   bcrpyt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//     if(err) return next(err);
//
//     bcrpyt.hash(user.password, salt, (err, hash) => {
//       if(err) return next(err);
//
//       user.password = hash;
//       next();
//     });
//   });
// });
//
// userSchema.methods.comparePassword = (candidatePassword, cb) => {
//   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     if(err) return cb(err);
//     cb(null, isMatch);
//   });
// };

let User = mongoose.model('User', userSchema);

module.exports = User;
