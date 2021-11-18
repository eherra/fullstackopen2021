import React from 'react'
import { useSelector } from 'react-redux'
import {
  Link
} from "react-router-dom"

const Users = ({ users }) => {
  const blogs = useSelector(state => state.blogs)

  if (!blogs.length || !users) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <tbody>
        <td>
        </td>
        <td>
          <b>blogs created</b>
        </td>
        {users.map(user =>
          <tr key={user.id}>
            <td style={{paddingRight: 20 }}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>
              {blogs.filter(countBlog => countBlog.user.id === user.id).length}
            </td>
          </tr>
        )}
      </tbody>
    </div>
  )
}

export default Users