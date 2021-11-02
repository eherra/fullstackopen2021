const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "ekaTest",
    author: "AuthorTest1",
    url: "www.tst.com",
    likes: 10
  },
  {
    title: "tokaTest",
    author: "AuthorTest2",
    url: "www.testi.com",
    likes: 12
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}