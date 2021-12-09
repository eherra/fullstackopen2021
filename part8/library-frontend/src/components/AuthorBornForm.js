import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorBornForm = ({authors}) => {
  const [name, setName] = useState('')
  const [bornYear, setBornYear] = useState('')

  const [ changeBornYear ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
        console.log(error, 'changeBorn errorr')
      }
  })

  const submit = (event) => {
    event.preventDefault()
    const setBornTo = parseInt(bornYear)
    changeBornYear({ variables: { name, setBornTo } })

    setName('')
    setBornYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
        <select onChange={({ target }) => setName(target.value)}>
            {authors.map(a => 
                <option value={a.name}>{a.name}</option>
            )}
        </select>
        </div>
        <div>
          born <input
            value={bornYear}
            onChange={({ target }) => setBornYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorBornForm