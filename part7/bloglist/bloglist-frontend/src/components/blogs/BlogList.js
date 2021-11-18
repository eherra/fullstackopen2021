import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  if (!user || !blogs.length) {
    return null
  }
  
  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      {blogs.sort(byLikes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
      )}
    </div>
    )  
  }

export default BlogList