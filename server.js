// server initiated
const express = require('express');
const app = express();

const dbConnected = require('./config/db');
dbConnected();

const bodyParser = require('body-parser');

require('dotenv').config();
const PORT = process.env.PORT || 6000

// middleware
app.use(bodyParser.json());


app.get('/' , (req ,res)=>{
  res.send('Welcom to blog ');
});


// import route
const  createComment= require('./routes/blogRoute');

// mount route
app.use('/api/v1' , createComment);


app.listen(PORT , ()=>{
  console.log(`Server started at port no ${PORT}`);
});