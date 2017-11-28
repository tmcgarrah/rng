const mongodb = require('mongodb');
const express = require('express');
const randomItem = require('random-item');
const User = require('./models/user.model');
const DbUser = require('./models/dbuser.model');

module.exports = {
  verifyUser,
  random,
  findUser,
  saveName
};

function verifyUser(uname, pword) {
  return User.find({username: uname, password: pword}).exec()
    .then((userSearchResults) => {
      if(userSearchResults && userSearchResults.length > 0) {
        return userSearchResults[0];
      } else {
        return 'Invalid username or password';
      }
    })
};

function random(array) {
  return randomItem(array);
};

function findUser(uname) {
  return User.find({username: uname}).exec();
}

function saveName(uname, name) {
  return findUser(uname).then((user) => {
    user[0].boynames.push(name);
    console.log(user);

    return user.save();
  });
};
