import React from 'react'
import Togglable from '../utils/Togglable'
import NewBlog from './NewBlog'
import BlogList from './BlogList'

const FrontBlogPage = ({blogFormRef, notifyWith}) => {
    return (
      <div>
        <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
          <NewBlog notifyWith={notifyWith} blogFormRef={blogFormRef}/>
        </Togglable>
        <BlogList />
      </div>
    )
  }

export default FrontBlogPage