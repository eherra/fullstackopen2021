import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote['content'].toLowerCase().includes(state.filter.toLowerCase()))
  })

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`you voted '${content}'`))

    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
  
  anecdotes.sort((a, b) => b.votes - a.votes)
  return (
    <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
            </div>
        )}
    </div>
  )
}

export default AnecdoteList