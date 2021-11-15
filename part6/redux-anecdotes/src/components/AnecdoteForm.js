import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const NOTIFICATION_SHOW_TIME = 5

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`you created '${content}' anecdote`, NOTIFICATION_SHOW_TIME)
  }
  
  return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button>create</button>
        </form>
      </div>
  )
}

const mapStateToProps = (state) => {}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm