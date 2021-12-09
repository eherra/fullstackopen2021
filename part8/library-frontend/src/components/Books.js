import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({show}) => {
  const result = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
      <tbody>
          {result.loading
          ? <div>loading books...</div>
          : <div>
            <tr>
              <th></th>
              <th>
              author
              </th>
              <th>
              published
            </th>
            </tr>
              {result.data.allBooks.map(b =>
              <tr key={b.name}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.published}</td>
              </tr>
              )}
            </div>
          }
        </tbody>
      </table>
    </div>
  )
}

export default Books