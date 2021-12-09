import React from 'react'
import { useQuery } from '@apollo/client'
import {ALL_AUTHORS } from '../queries'
import AuthorBornForm from './AuthorBornForm'

const Authors = ({show}) => {
  const result = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          {result.loading
          ? <div>loading authors...</div>
          : <div>
            <tr>
              <th></th>
              <th>
              born
              </th>
              <th>
              books
            </th>
            </tr>
              {result.data.allAuthors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
              )}
            </div>
          }
        </tbody>
      </table>
      {!result.loading && <AuthorBornForm authors={result.data.allAuthors}/>}
    </div>
  )
}

export default Authors
