const express = require('express');
const router = express.Router();
const { Person } = require('../mongo');

router.get('/health', (req, res) => {
  res.send('ok')
})

router.get('/info', (request, response, next) => {
  const date = new Date().toString()
  Person.find({})
    .then(persons => {
      response.write(`<p>Phonebook has info for ${persons.length} people</p>`)
      response.write(`<p>${date}</p>`)
      response.end()
    })
    .catch(error => next(error))
})

module.exports = router;
