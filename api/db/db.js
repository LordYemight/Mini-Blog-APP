const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect (process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('connected to MongoDB_database')
}).catch((error) => {
  console.log('Error connecting to MONGODB_DATABASE:', error)
})

module.exports = mongoose;

