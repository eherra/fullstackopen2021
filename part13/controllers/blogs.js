const router = require('express').Router()
const { Op } = require('sequelize')
const { tokenExtractor } = require('../utils/tokenExtractor')
const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [{
        title: {
          [Op.substring]: req.query.search.toLowerCase()
        }
      },
      {
        author: {
          [Op.substring]: req.query.search.toLowerCase()
        }
      }]
    }
  }
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    order: [['likes', 'DESC']],
    where
  })

  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    if (user.disabled) {
      return res.status(401).json({
        error: 'session expired, please login again'
      })
    }

    const blog = await Blog.create({ ...req.body, userId: user.id })
    return res.json(blog)
  } catch(error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    blog.likes = req.body.likes
    await blog.save()
    res.json(blog)
  } catch(error) {
    next(error)
  }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    const user = await User.findByPk(req.decodedToken.id)

    if (user.disabled) {
      return res.status(401).json({
        error: 'session expired, please login again'
      })
    }

    if (blog && user.id === blog.userId) {
      await blog.destroy()
    }
    res.status(204).end()
  } catch(error) {
    return res.status(400).json({ error })
  }
})

module.exports = router