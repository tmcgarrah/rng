const mongodb = require('mongodb');
const express = require('express');
const _ = require('lodash');
const randomItem = require('random-item');
const User = require('./models/user.model');
const DbUser = require('./models/dbuser.model');

module.exports = {
  verifyUser,
  random,
  findUser,
  saveName,
  deleteName
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

function saveName(user, nameData) {
  const newType = nameData.type;
  const newName = nameData.name;

  user.favorite[newType].push(newName);

  return user;
};

function deleteName(user, thisName) {

  const name = thisName.name;
  _.remove(user.favorite[thisName.type], (n) => { return n === name});
  return user;

};
