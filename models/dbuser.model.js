let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const dbSchema = new Schema({
  id: String,
  favorite: {
    boynames: [String],
    girlnames: [String],
    syllablenames: [String],
    wordnames: [String]
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

let DbUser = mongoose.model('DbUser', dbSchema);

module.exports = DbUser;
