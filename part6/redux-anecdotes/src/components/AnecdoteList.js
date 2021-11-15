import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NOTIFICATION_SHOW_TIME = 5

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote['content'].toLowerCase().includes(state.filter.toLowerCase()))
  })

  const vote = (id, anecdote) => {
    dispatch(voteAnecdote(id, anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, NOTIFICATION_SHOW_TIME))
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
                <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
            </div>
            </div>
        )}
    </div>
  )
}

export default AnecdoteList