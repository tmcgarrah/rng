const isLoggedIn = require('../middleware/is-logged-in.mw');
const rngServices = require('../rng.services');
const User = require('../models/user.model');
const fs = require('fs');

const girls = fs.readFileSync('./names/girl.txt', 'utf-8').toString().toUpperCase().split('\n');
const boys = fs.readFileSync('./names/boy.txt', 'utf-8').toString().toUpperCase().split('\n');
const surnames = fs.readFileSync('./names/surname.txt', 'utf-8').toString().toUpperCase().split('\n');
const syllables = fs.readFileSync('./names/syllables.txt', 'utf-8').toString().toUpperCase().split('\n');
const words = fs.readFileSync('./names/words.txt', 'utf-8').toString().toUpperCase().split('\n');

module.exports = function (passport) {
  var router = require('express').Router();

  router.get('/', (req, res) => {
    res.status(200).sendFile(process.cwd() + '/assets/index.html');
  });

  router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

  router.get(
    '/login/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => { res.redirect('/secrets');
  });

  router.get('/secrets', isLoggedIn, function (req, res) {
    res.status(200).sendFile(process.cwd() + '/assets/secrets.html');
  });

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  router.get('/boy/:num', isLoggedIn, (req, res) => {
    if(isLoggedIn) {
      list = [];
      const qty = req.params.num.toString();
      for (let i = 0; i < qty; i++) {
        list[i] = rngServices.random(boys).concat(' ').concat(rngServices.random(surnames));
      }
      console.log(list);
      res.status(200).send(list);
    } else {
      res.status(500).send('Login required');
      console.log('Login required');
    }
  });

  router.get('/girl/:num', isLoggedIn, (req, res) => {
    list = [];
    const qty = req.params.num.toString();
    for (let i = 0; i < qty; i++) {
      list[i] = rngServices.random(girls).concat(' ').concat(rngServices.random(surnames));
    }
    console.log(list);
    res.status(200).send(list);
  });

  router.get('/rsname/:num/:syl', isLoggedIn, (req, res) => {
    list = [];
    const qty = req.params.num.toString();
    const sylnum = req.params.syl.toString();
    for (let i = 0; i < qty; i++) {
      let temp = rngServices.random(syllables);
      for (let j = 1; j < sylnum; j++) {
        temp = temp.concat('-').concat(rngServices.random(syllables));
      }
      list[i] = temp;
    }
    console.log(list);
    res.status(200).send(list);
  });

  router.get('/rwords/:num/:syl', isLoggedIn, (req, res) => {
    list = [];
    const qty = req.params.num.toString();
    const sylnum = req.params.syl.toString();
    for (let i = 0; i < qty; i++) {
      let temp = rngServices.random(words);
      for (let j = 1; j < sylnum; j++) {
        temp = temp.concat('-').concat(rngServices.random(words));
      }
      list[i] = temp;
    }
    console.log(list);
    res.status(200).send(list);
  });

  router.post('/save', isLoggedIn, (req, res) => {
    const nameData = req.body;

    User.findOne( {_id: req.user._id}).exec()
      .then((userFound) => {
        let user = new User(rngServices.saveName(userFound, nameData));
        user.update( { _id: req.user._id}, {$set: {favorite: user.favorite}}).exec()
        user.save().then(() => {
          console.log(user.favorite);
          res.status(200).send(user.favorite);
        })
      })
  });

  router.post('/delete', isLoggedIn, (req, res) => {
    const deleteName = req.body;

    User.findOne( {_id: req.user._id}).exec()
      .then((userFound) => {
        let user = new User(rngServices.deleteName(userFound, deleteName));
        user.markModified('favorite');
        user.update( { _id: req.user._id}, { $set: { favorite: user.favorite }}).exec()
          user.save().then((result) => {
            console.log('name deleted');
            res.status(200).send('name deleted');
        })
      })
  });

  router.get('/favorites', isLoggedIn, (req, res) => {
    User.findOne( {_id: req.user._id}).exec()
      .then((userFound) => {
        console.log(userFound);
        res.status(200).send(userFound);
      })
  });

  return router;
};
