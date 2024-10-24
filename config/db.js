const mongoose = require('mongoose');

require('dotenv').config();

const dbConnected = ()=>{
  mongoose.connect(process.env.MONGODB_URL)
  .then(()=>{
    console.log('MongoDB server Connected')
  })
  .catch((error)=>{
    console.log('MongoDB server disconnected')
    console.error(error)
    process.exit(1);
  })
}

module.exports = dbConnected;