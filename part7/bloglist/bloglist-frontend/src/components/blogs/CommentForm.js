import React, { useState } from 'react'

const CommentForm = ({ handleCommentAdd }) => {
  const[comment, setComment] = useState('')

  const handleComment = async (event) => {
    handleCommentAdd(event, comment)
    setComment('')
  }
  
  return (
    <div>
      <form onSubmit={e => handleComment(e)}>
        <input
          id='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button id='login'>add comment</button>
      </form>
    </div>
  )
}

export default CommentForm