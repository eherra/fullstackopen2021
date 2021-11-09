import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showRemoveButton = JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username === blog.user.username

  const buttonText = visible ? 'hide' : 'view'

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonText}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        likes {blog.likes} <button onClick={e => handleLike(e, blog)}>like</button><br/>
        {blog.user.name}<br/>
        {showRemoveButton &&
          <button onClick={e => handleDelete(e, blog)}>remove</button>}
      </div>
    </div>
  )
}

export default Blog