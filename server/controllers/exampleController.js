const db = require('../models/model');

const exampleController = {};

exampleController.getPeople = (req, res, next) => {

  const search = `SELECT * FROM project`;

  db
    .query(search)
    .then(response => { 
      res.locals.people = response.rows;
      return next();
    })
    .catch(err => next({
      log: 'getPeople failed to load data',
      message: { err: 'no response received' },
    }));

};

exampleController.getWordBank = (req, res, next) => {

  const search = `SELECT * FROM dictionary
  ORDER BY RANDOM()
  LIMIT 16`;

  db
    .query(search)
    .then(response => { 
      res.locals.wordBank = response.rows;
      return next();
    })
    .catch(err => next({
      log: 'getWordBank failed to load data',
      message: { err: 'no response received' },
    }));

};

module.exports = exampleController;