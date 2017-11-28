let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const userSchema = new Schema({
  github: {
    id: String,
    username: String,
    publicRepos: Number
  }
});

// let userSchema = new Schema({
//   username: {type: String, required: true, index: {unique: true}},
//   password: {type: String, required: true},
//   favorite: {
//     boynames: [String],
//     girlnames: [String],
//     syllablenames: [String],
//     wordnames: [String]
//   }
// });

let User = mongoose.model('User', userSchema);

module.exports = User;
