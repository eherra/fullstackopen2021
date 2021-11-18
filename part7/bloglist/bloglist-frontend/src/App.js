import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Notification from './components/utils/Notification'
import Users from './components/users/Users'
import UserPage from './components/users/UserPage'
import BlogPage from './components/blogs/BlogPage'
import LoginForm from './components/login/LoginForm'
import FrontBlogPage from './components/blogs/FrontBlogPage'

import {
  Routes, Route
} from "react-router-dom"

import usersService from './services/users'

import storage from './utils/storage'

import { initializeBlogs } from './reducers/blogReducer'
import { loginUser } from './reducers/userReducer'
import LoggedInfo from './components/utils/Navigator'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = React.createRef()
  const [users, setUsers] = useState()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(loginUser(storage.loadUser()))
  },[dispatch])

  useEffect(() => {
    const fetchUsers = async () => {
        const users = await usersService.getAll()
        setUsers(users)
      }
      fetchUsers()
  },[])

  return (
    <div className="container">
      <LoggedInfo />
      <Notification />

      <Routes>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/users" element={<Users users={users}/>}></Route>
        <Route path="/blogs/:id" element={<BlogPage/>}></Route>
        <Route path="/users/:id" element={<UserPage users={users}/>}></Route>
        <Route path="/" element={<FrontBlogPage blogFormRef={blogFormRef}/>}></Route>
      </Routes>
    </div>
  )
}

export default App