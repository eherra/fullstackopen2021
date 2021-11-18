import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import UserPage from './components/UserPage'
import BlogPage from './components/BlogPage'

import BlogList from './components/BlogList'
import {
  Routes, Route, Link, useNavigate
} from "react-router-dom"

import loginService from './services/login'
import usersService from './services/users'

import storage from './utils/storage'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { loginUser } from './reducers/userReducer'
import LoggedInfo from './components/LoggedInfo'

const FrontPage = ({blogFormRef, notifyWith}) => {
  return (
    <div>
      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog notifyWith={notifyWith} blogFormRef={blogFormRef}/>
      </Togglable>
      <BlogList />
    </div>
  )
}

const LoginForm = ({notifyWith}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
      navigate('/')
      dispatch(loginUser(user))
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  return (
    <div>
      <h2>login to application</h2>

      <Notification />

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login'>login</button>
      </form>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = React.createRef()
  const [users, setUsers] = useState()

  useEffect(() => {
    dispatch(initializeBlogs())

    const user = storage.loadUser()
    dispatch(loginUser(user))
  },[])

  useEffect(() => {
    const fetchUsers = async () => {
        const users = await usersService.getAll()
        setUsers(users)
      }
      fetchUsers()
  },[])

  const notifyWith = (message, type='success') => {
    dispatch(setNotification({
      message, type
    }))
  }

  return (
    <div>
      <LoggedInfo />
      <Notification />

      <Routes>
        <Route path="/login" element={<LoginForm notifyWith={notifyWith}/>}></Route>
      
        <Route path="/users" element={<Users users={users}/>}></Route>
        <Route path="/blogs/:id" element={<BlogPage users={users}/>}></Route>

        <Route path="/users/:id" element={<UserPage users={users}/>}></Route>

        <Route path="/" element={<FrontPage blogFormRef={blogFormRef} notifyWith={notifyWith}/>}></Route>
      
      </Routes>
    </div>
  )
}

export default App