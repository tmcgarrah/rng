const express = require('express');
const bodyParser = require('body-parser');
const User = require('./user.model');
const mongodb = require('./mongodb.utils');
const rngServices = require('./rng.services.js');

const app = express();
const PORT = 3001;

mongodb.createEventListeners();
mongodb.connect();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to RNG');
});

app.get('/usboy', (req, res) => {
  res.status(200).send('Random US Boy Name');
});

app.get('/usgirl', (req, res) => {
  res.status(200).send('Random US Girl Name');
});

app.get('/rsname', (req, res) => {
  res.status(200).send('Random Syllable Name');
});

app.post('/create', (req, res) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  newUser.save()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      mongodb.disconnect;
      throw err;
    });
});

app.post('/login', (req, res) => {
  let uname = req.body.username;
  let pword = req.body.password;

  rngServices.verifyUser(uname, pword)
    .then((userFound) => {
      if(userFound === []) {
        throw err;
      };
      res.status(200).send('Login succesful');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
