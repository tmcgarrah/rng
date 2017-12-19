const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = {
  connect,
  disconnect,
  createEventListeners
};

function connect() {

  // const uri = 'mongodb://localhost:27017/RNG';
  const uri = 'mongodb://trevor:password@ds229415.mlab.com:29415/rng';
  mongoose.connect(uri, { useMongoClient: true});

};

function disconnect() {

  mongoose.disconnect();

};

function createEventListeners() {
  mongoose.connection.on('connected', () => {
    console.log('Connected to Database');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Database connection closed');
  });

  mongoose.connection.on('error', (err) => {
    console.log('There was an issue connecting to the database');
  });
};
