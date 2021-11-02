const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)
const JWT_BEARER_TOKEN = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRha2VuVXNlcm5hbWUiLCJpZCI6IjYxODExOWUyODdhZWJhZDA4MTRjY2QzZiIsImlhdCI6MTYzNTg1MDg4N30.cD2YCcy0zed-3s0caG5q2bpRpWTEBCeFPPNXMtF1ACs'

beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    // initializing test user
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('root', 10)
    const user = new User({ username: 'takenUsername', password: 'root', passwordHash })
    await user.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .set('Authorization', JWT_BEARER_TOKEN) 
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const blogsInDb = await helper.blogsInDb();
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
})

test('all blogs have value id on them', async () => {
    const blogsInDb = await helper.blogsInDb();

    for (blog of blogsInDb) {
        expect(blog.id).toBeDefined();
    }
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "TestTitle",
        author: "testAuthor",
        url: "url.com",
        likes: 2
    }

    await api
      .post('/api/blogs')
      .set('Authorization', JWT_BEARER_TOKEN) 
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsInDb = await helper.blogsInDb();

    const contents = blogsInDb.map(r => r.title)
  
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain(
      'TestTitle'
    )
})

test('when likes value is not given, it set to 0 as a default', async () => {
    const newBlogWithNoLikes = {
        title: "TestTitleWithNoLikes",
        author: "testAuthor",
        url: "url.com",
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', JWT_BEARER_TOKEN) 
      .send(newBlogWithNoLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsInDb = await helper.blogsInDb();
  
    const blogWihNoLikes = blogsInDb.find(blog => blog.title === 'TestTitleWithNoLikes')
    expect(blogWihNoLikes.likes).toBe(0)
})

test('when title missing from blog, return code is 400', async () => {
    const newBlogWithNoTitle = {
        author: "authorShouldNotExist",
        url: "url.com",
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', JWT_BEARER_TOKEN) 
      .send(newBlogWithNoTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb();

    const blogNotExisting = blogsInDb.find(blog => blog.author === 'authorShouldNotExist')
    expect(blogNotExisting).toEqual(undefined)
})

test('when url missing from blog, return code is 400', async () => {
    const newBlogWithNoUrl = {
        title: "titleShouldNotExist",
        author: "authorShouldNotExist"
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', JWT_BEARER_TOKEN) 
      .send(newBlogWithNoUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb();

    const blogNotExisting = blogsInDb.find(blog => blog.title === 'titleShouldNotExist')
    expect(blogNotExisting).toEqual(undefined)
})

    test('when jwt token missing, return code is 401 Unauthorized', async () => {
        const newBlog = {
            title: "titleShouldNotExist",
            author: "authorShouldNotExist"
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(401)
          .expect('Content-Type', /application\/json/)
    
        const blogsInDb = await helper.blogsInDb();
    
        const blogNotExisting = blogsInDb.find(blog => blog.title === 'titleShouldNotExist')
        expect(blogNotExisting).toEqual(undefined)
})

afterAll(() => {
  mongoose.connection.close()
})