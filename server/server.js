const path = require('path');
const express = require('express');
const cors = require('cors')

const app = express();
const PORT = 3000;

const mongoose = require('mongoose');
const keys = require('./../config/keys')

mongoose.connect(keys.mongodb.dbURI);
mongoose.connection.on('open', () => {
  console.log('connected to mongo')
})


app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });


app.use(cors());

//handle parsing request body
app.use(express.json());
//best practice to use this
app.use(express.urlencoded({extended: true}))

// Initialize Passport and the Express session
// const passport = require('passport')
// app.use(passport.initialize());
// app.use(passport.session());

const authRoutes = require('./routes/authRoutes');
// Use the OAuth routes
app.use('/auth', authRoutes);

//require routers
const exampleRouter = require('./routes/exampleRoute');
//define route handlers
app.use('/api/example', exampleRouter);

//catch-all error handler for undefined routes
app.use('*', (req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
  console.error(err)
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' }, 
    };
    const errorObj = Object.assign(defaultErr, err); 
    res.status(errorObj.status).send(errorObj.message);
  });

// start server
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
  
  module.exports = app;