const mongodb = require('mongodb');
const express = require('express');
const User = require('./user.model');

module.exports = {
  verifyUser
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
