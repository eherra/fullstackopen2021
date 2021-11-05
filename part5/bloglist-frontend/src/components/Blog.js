import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)

      } catch (exception) {
        console.log(exception)
      }
    }
  }

  const handleLike = async (event) => {
    event.preventDefault()
    try {
      await blogService.update({
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      }, blog.id)
      setLikes(() => blog.likes + 1)
    } catch (exception) {
      console.log(exception)
    }
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
        likes {likes} <button onClick={handleLike}>like</button><br/>
        {blog.user.name}<br/>
        {showRemoveButton &&
          <button onClick={handleRemove}>remove</button>
        }
      </div>
    </div>
  )}

export default Blog