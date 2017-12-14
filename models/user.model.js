let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const userSchema = new Schema({
  github: {
    id: String,
    username: String,
    publicRepos: Number
  },
  favorite: {
    boynames: [String],
    girlnames: [String],
    syllablenames: [String],
    wordnames: [String]
  }
});
