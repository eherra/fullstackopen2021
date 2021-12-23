import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({show}) => {
  const result = useQuery(ALL_BOOKS)
  const[genre, setGenre] = useState('')

  if (!show) {
    return null
  }

  let booksData = result.data.allBooks
  const allGenres = new Set([].concat.apply([], booksData.map(book => book.genres)))

  if (genre !== '') {
    booksData = booksData.filter(b => b.genres.includes(genre))
  }
  
  return (
    <div>
      <h2>books</h2>

      <table>
      <tbody>
          {result.loading
          ? <div>loading books...</div>
          : <div>
            <p>in genre <b>patterns</b></p>
            <tr>
              <th></th>
              <th>
              author
              </th>
              <th>
              published
            </th>
            </tr>
              {booksData.map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
              )}
            </div>
          }
        </tbody>
      </table>
      <div>
        {Array.from(allGenres).map(genre => 
          <button onClick={() => setGenre(genre)}>{genre}</button>
        )}
      </div>
    </div>
  )
}

export default Books