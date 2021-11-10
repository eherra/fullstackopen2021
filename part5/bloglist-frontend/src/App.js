import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll()
      .then(blogs =>
        setBlogs(blogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <Notification message={notificationMessage} isError={isError}/>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogFormRef = useRef()
  const addBlogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          handleSubmit={handleBlogAdd}
        />
      </Togglable>
    )
  }

  const handleNotificationShow = (message, isErrorMessage) => {
    setIsError(isErrorMessage)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 4000)
  }

  const blogsView = () => {
    blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleDelete={handleDelete} handleLike={handleLike} />
        )}
      </div>
    )}

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleNotificationShow('wrong username or password', true)
    }
  }

  const handleBlogAdd = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({
        title, author, url
      })
      setUser(user)
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(blog))
      handleNotificationShow(`a new blog ${title} by ${author} added`, false)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      handleNotificationShow('blog adding didnt work', true)
    }
  }

  const handleDelete = async (event, blog) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        handleNotificationShow('the blog was deleted succesfully', false)
      } catch (exception) {
        handleNotificationShow('blog deleting didnt go thru', true)
      }
    }
  }

  const handleLike = async (event, blog) => {
    event.preventDefault()
    try {
      const returnedBlog = await blogService.update({
        author: blog.author,
        title: blog.title,
        url: blog.url,
        user: blog.user.id,
        likes: blog.likes + 1
      }, blog.id)

      // adding user data from the old blog
      returnedBlog.user = {
        username: blog.user.username,
        name: blog.user.name
      }

      const updatedBlogs = blogs.map(b => b.id !== blog.id ? b : returnedBlog)
      setBlogs(updatedBlogs)
    } catch (exception) {
      handleNotificationShow('adding like didnt go thru', true)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      {user === null
        ? loginForm()
        : <div>
          <h1>Blogs</h1>
          <Notification message={notificationMessage} isError={isError} />
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {addBlogForm()}
          {blogsView()}
        </div>
      }
    </div>
  )
}

export default App