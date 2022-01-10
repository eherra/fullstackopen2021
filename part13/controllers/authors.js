const router = require('express').Router()

const { Blog } = require('../models')
const { sequelize } = require('../utils/db')

router.get('/', async (req, res, next) => {
  try {
    const authors = await Blog.findAll({
      group: 'blog.author',
      attributes: [
        'author',
        [sequelize.fn('COUNT', sequelize.col('author')), 'articles'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'totalLikes']
      ]
    })
    res.json(authors)
  } catch(error) {
    next(error)
  }
})

module.exports = router