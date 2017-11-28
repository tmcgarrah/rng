const isLoggedIn = require('../middleware/is-logged-in.mw');
const rngServices = require('../rng.services');
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

  router.get('/boy/:num', (req, res) => {
    list = [];
    const qty = req.params.num.toString();
    for (let i = 0; i < qty; i++) {
      list[i] = rngServices.random(boys).concat(' ').concat(rngServices.random(surnames));
    }
    console.log(list);
    res.status(200).send(list);
  });

  router.get('/girl/:num', (req, res) => {
    list = [];
    const qty = req.params.num.toString();
    for (let i = 0; i < qty; i++) {
      list[i] = rngServices.random(girls).concat(' ').concat(rngServices.random(surnames));
    }
    console.log(list);
    res.status(200).send(list);
  });

  router.get('/rsname/:num/:syl', (req, res) => {
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

  router.get('/rwords/:num/:syl', (req, res) => {
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

  // router.get('/favorites', (req, res) => {
  //   let temp = req.query.username;
  //   rngServices.findUser(temp)
  //     .then((foundUser) => {
  //       res.status(200).send(foundUser[0].favorite);
  //     })
  //     .catch((err) => {
  //       res.status(500).send(err)
  //     })
  // });

  return router;
};
