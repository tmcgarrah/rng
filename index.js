const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');

const routes = require('./routes')(passport);
const configPassport = require('./configs/passport.config');
const User = require('./models/user.model');
const DbUser = require('./models/dbuser.model');
const mongodb = require('./mongodb.utils');
const rngServices = require('./rng.services.js');

const app = express();
const jsonParser = bodyParser.json();
const PORT = 3000;

let list = [];
let user;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/authdemo', {useMongoClient: true });

configPassport(passport);

mongodb.createEventListeners();
mongodb.connect();

app.use(session({secret: 'menagerie of monkeys', resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/assets', express.static(process.cwd() + '/assets'));
app.use('/', routes);


// app.post('/create', (req, res) => {
//   let newUser = new User({
//     username: req.body.username,
//     password: req.body.password
//   });
//
//   newUser.save()
//     .then((result) => {
//       console.log(result);
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       mongodb.disconnect;
//       throw err;
//     });
// });
//
// app.post('/login', (req, res) => {
//   let uname = req.body.username;
//   let pword = req.body.password;
//
//   rngServices.verifyUser(uname, pword)
//     .then((userFound) => {
//       if(userFound === []) {
//         throw err;
//       };
//       user = uname;
//       res.status(200).send('Login succesful');
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });
//
// app.put('/favorites', jsonParser, (req, res) => {
//   let newName = req.body.name;
//   let uname = req.query.username;
//
//   rngServices.saveName(uname, newName).then((updatedUser) => {
//     console.log(updatedUser);
//     res.status(200).send(updatedUser);
//   }).catch((error) => {
//     res.status(500).send(error);
//   });
// });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
