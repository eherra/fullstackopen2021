import {
    useParams
  } from "react-router-dom"
import { useSelector } from 'react-redux'

const UserPage = ({users}) => {
  const userId = useParams().id
  let blogs = useSelector(state => state.blogs)

  if (!blogs.length || !users) {
    return null
  }

  const user = users.find(n => n.id === userId)
  blogs = blogs.filter(countBlog => countBlog.user.id === user.id)

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added blogs</h4>
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default UserPage