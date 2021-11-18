import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  const modifiedState = [...state]
  switch (action.type) {
  case 'LIKE_BLOG':
    return modifiedState.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'NEW_BLOG':
    return modifiedState.concat(action.data)
  case 'INIT_BLOG':
    return action.data
  case 'REMOVE_BLOG':
    return modifiedState.filter(b => b.id !== action.data)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      data: blogs,
    })
  }
}

export const removeBlog = blogId => {
  return async dispatch => {
    await blogService.remove(blogId)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blogId
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      })
    } catch (exception) {
      throw exception
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const returnedBlog = await blogService.update({
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    }, blog.id)

    // adding user data from the orginal blog
    returnedBlog.user = {
      id: blog.user.id,
      username: blog.user.username,
      name: blog.user.name
    }

    dispatch({
      type: 'LIKE_BLOG',
      data: returnedBlog,
    })
  }
}

export default blogReducer