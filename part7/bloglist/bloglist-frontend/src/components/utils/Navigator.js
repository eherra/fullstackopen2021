import { useDispatch } from 'react-redux'
import storage from '../../utils/storage'
import { logoutUser } from '../../reducers/userReducer'
import {
    useNavigate, Link
  } from "react-router-dom"

const LoggedInfo = () => {
  const user = storage.loadUser()    
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!user) {
    return null
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    storage.logoutUser()
    navigate('/login')
  }

  const navigationStyle = {
    padding: 5,
    backgroundColor: 'lightgrey'
  }

  return (
    <div>
    <div style={navigationStyle}>
      <Link style={{paddingRight: 5}} to="/">blogs</Link>
      <Link style={{paddingRight: 5}} to="/users">users</Link>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
    <div>
      <h2>Blog app</h2>
    </div>
    </div>
  )
}

export default LoggedInfo