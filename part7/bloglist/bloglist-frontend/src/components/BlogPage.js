import {
    useParams
  } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const CommentForm = ({ blogId }) => {
  const[comment, setComment] = useState('')

  const handleCommentAdd = async (event) => {
    event.preventDefault()

    try {
      await blogService.addBlogComment({ comment }, blogId)
      setComment('')
    } catch (exception) {
      console.log(exception)
    }
  }
  
  return (
    <div>
      <form onSubmit={handleCommentAdd}>
      <input
        id='comment'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
        <button id='login'>add comment</button>
      </form>
    </div>
  )
}

const BlogPage = () => {
  const dispatch = useDispatch()
  const blogId = useParams().id
  const blogs = useSelector(state => state.blogs)
  const [comments, setComments] = useState([])

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
  }

  useEffect(() => {
    const fetchComments = async () => {
        const fetchedComments = await blogService.getBlogCommentsByBlogId(blogId)
        setComments(fetchedComments)
      }
      fetchComments()
  },[])

  if (!blogs.length || !blogId) {
      return null
  }

  const blog = blogs.find(n => n.id === blogId)
  const blogUrl = `https://${blog.url}`

  return (
      <div>
        <h2>{blog.title} {blog.author}</h2>
        <a href={blogUrl}>{blog.url}</a>
        <div>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>Added by {blog.user.name}</div>

        <div>
        <h3>Comments</h3>
        <CommentForm blogId={blog.id}/>
        <ul>
          {comments && comments.map(comment =>
            <li key={comment.id}>{comment.content}</li>
          )}
        </ul>
        </div>
      </div>

    )
  }

export default BlogPage