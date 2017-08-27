// in ES6
// import mongoose from 'mongoose';

const mongoose = require('mongoose');
// ES5 version?

mongoose.connect('mongodb://localhost/nodewebapp', {
  useMongoClient: true
});
