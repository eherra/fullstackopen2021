import anecdotesService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  const modifiedState = [...state]
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      let updateAnecdote = modifiedState.find(a => a.id === action.data.id)
      updateAnecdote.votes += 1
      return modifiedState
    case 'NEW_ANECDOTE':
      return modifiedState.concat(action.data)
    case 'INIT_ANECDOTES':
        return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = (id, anecdote) => {
  return async dispatch => {
    await anecdotesService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    }, id)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: { id },
    })
  }
}

export default anecdoteReducer