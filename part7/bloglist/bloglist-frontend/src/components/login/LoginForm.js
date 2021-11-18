import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  useNavigate
} from "react-router-dom"

import loginService from '../../services/login'
import storage from '../../utils/storage'
import { loginUser } from '../../reducers/userReducer'
import { setNotification } from '../../reducers/notificationReducer'

const LoginForm = () => {
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

      dispatch(setNotification({
        message: `${user.name} welcome back!`, type: 'success'
      }))

      storage.saveUser(user)
      dispatch(loginUser(user))
      navigate('/')
    } catch(exception) {
      dispatch(setNotification({
        message: 'wrong username/password', type: 'error'
      }))
    }
  }

  return (
    <div className="container">
      <h2>login to application</h2>
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

export default LoginForm