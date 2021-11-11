import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'
import Blog from './Blog'

describe('Togglable component works as intended', () => {
  let component

  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'www.testUrl.com',
    likes: 12,
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

  const likeMockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel='show'>
        <Blog blog={blog} className='.testDiv' handleLike={likeMockHandler}/>
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'www.testUrl.com'
    )

    expect(component.container).toHaveTextContent(
      'likes 12'
    )
  })

  test('clicking "like" button two times calls handled twice', async () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })
})