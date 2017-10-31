const mongodb = require('mongodb');
const express = require('express');
const randomItem = require('random-item');
const User = require('./user.model');

module.exports = {
  verifyUser,
  random
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
