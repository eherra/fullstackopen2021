import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const getBooksDataByFavoriteGenre = (booksData, favoriteGenre) => {
  return booksData.filter(b => b.genres.includes(favoriteGenre))
}

const Recommend = ({ show } ) => {
  const result = useQuery(ALL_BOOKS)
  const resultMe = useQuery(ME)

  if (!show) {
    return null
  }

  const booksData = getBooksDataByFavoriteGenre(result.data.allBooks, resultMe.data.me.favoriteGenre)

  return (
    <div>
      <h2>recommendations</h2>

      <table>
      <tbody>
          {result.loading || resultMe.loading ? (
            <div>loading books...</div>
          ) : ( 
            <div>
              <p>books in your favorite genre <b>patterns</b></p>
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
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Recommend