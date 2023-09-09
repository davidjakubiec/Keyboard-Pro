const express = require('express');

const exampleController = require('../controllers/exampleController');

const router = express.Router();

router.get('/',
  exampleController.getPeople,
  (req, res) => res.status(200).json(res.locals.people)
);

router.get('/wordbank',
  exampleController.getWordBank,
  (req, res) => res.status(200).json(res.locals.wordBank)
);

module.exports = router;
