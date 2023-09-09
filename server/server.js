const path = require('path');
const express = require('express');
const cors = require('cors')

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });


app.use(cors());

//handle parsing request body
app.use(express.json());
//best practice to use this
app.use(express.urlencoded({extended: true}))

//require routers
const exampleRouter = require('./routes/exampleRoute');
//define route handlers
app.use('/api/example', exampleRouter);

//catch-all error handler for undefined routes
app.use('*', (req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
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