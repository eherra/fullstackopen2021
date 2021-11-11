import React from 'react'

const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new</h2>
      <div>
          title:
        <input
          id='title'
          type="text"
          value={title}
          name="title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          id='author'
          type="text"
          value={author}
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          id='url'
          type="text"
          value={url}
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <button id="create-blog-button" type="submit">create</button>
    </form>
  )
}

export default BlogForm