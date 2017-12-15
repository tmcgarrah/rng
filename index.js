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


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
