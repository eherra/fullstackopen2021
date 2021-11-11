import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content when blog is hidden', () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    user: {
      username: 'testUser'
    }
  }

  const testUser = {
    username: 'testUser'
  }

  window.localStorage.setItem(
    'loggedBlogappUser', JSON.stringify(testUser)
  )

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'testTitle'
  )

  expect(component.container).toHaveTextContent(
    'testAuthor'
  )
})