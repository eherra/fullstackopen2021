const express = require('express');
const { Person } = require('../mongo');
const router = express.Router();

router.get('/', async (_, res) => {
  const persons = await Person.find({});
  res.send(persons);
});

router.post('/', async (req, res, next) => {
  const body = req.body
  try {
    const person = await Person.create({
      name: body.name,
      number: body.number
    })
    res.send(person);
  } catch (error) {
    next(error)
  }
})

const singlePersonRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.person = await Person.findById(id)
  if (!req.person) return res.sendStatus(404)
  next()
}

singlePersonRouter.delete('/', async (req, res) => {
  await req.person.delete()  
  res.sendStatus(200);
});

singlePersonRouter.get('/', async (req, res) => {
  res.json(req.person);
});

singlePersonRouter.put('/', async (req, res) => {
  try {
    req.person.number = req.body.number
    req.person.name = req.body.name
    const saved = await req.person.save()
    res.json(saved)
  } catch (error) {
    console.log(error)
    res.sendStatus(405); 
  }
});

router.use('/:id', findByIdMiddleware, singlePersonRouter)

module.exports = router;