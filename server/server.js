const path = require('path');
const express = require('express');
const cors = require('cors')
const cookieSession = require('cookie-session')
const passport = require('passport')

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


// app.use('*', express.static('js'))




app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [keys.session.cookieKey]
}));

// Initialize Passport and the Express session
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/user', (req, res) => {
  const user = req.session.user;
  res.status(200).json(user);
});

const authRoutes = require('./routes/authRoutes');
// Use the OAuth routes
app.use('/auth', authRoutes);

const profileRoutes = require('./routes/profileRoutes');
// Use the profile routes
app.use('/profile', profileRoutes);

//require routers
const exampleRouter = require('./routes/exampleRoute');
//define route handlers
app.use('/api/example', exampleRouter);

app.get("/:path*", function (req, res) {
  
  res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'dist/index.html'));
// });

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