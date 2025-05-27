import React, { useState } from 'react'
import useCommentStore from '../store/commentStore'

function CommentBox({ todoId, showInput }) {
  const [commentInput, setCommentInput] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const comments = useCommentStore((state) => state.comments)
  const addComment = useCommentStore((state) => state.addComment)
  const toggleCommentBox = useCommentStore((state) => state.toggleCommentBox)
  const deleteComment = useCommentStore((state) => state.deleteComment)
  const updateComment = useCommentStore((state) => state.updateComment)

  const handleAdd = () => {
    if (commentInput.trim()) {
      addComment(todoId, commentInput)
      setCommentInput('')
      toggleCommentBox(todoId)
    }
  }

  const handleEdit = (comment) => {
    setEditingId(comment.id)
    setEditText(comment.text)
  }

  const handleSave = () => {
    if (editText.trim()) {
      updateComment(todoId, editingId, editText)
      setEditingId(null)
      setEditText('')
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditText('')
  }

  return (
    <div className='mt-2 ml-6'>
      {showInput && (
        <div className='input-box'>
          <input
            type='text'
            placeholder='Write a comment...'
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className='border px-2 py-1 mr-2 text-sm'
          />
          <button
            onClick={handleAdd}
            className='bg-green-500 text-white text-sm px-2 py-0.5 rounded hover:bg-green-600'
          >
            SUBMIT
          </button>
        </div>
      )}
      <div className='content-box'>
        <ul className='mt-2 text-sm text-gray-600 flex'>
          {(comments[todoId] || []).map((comment) => (
            <li 
              key={comment.id}
              className='mb-2 flex items-center'
            >
              { editingId === comment.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className='border px-2 py-1 text-sm'
                  />
                  <button
                    onClick={handleSave}
                    className='ml-2 text-green-600 hover:underline'
                  >
                    SAVE
                  </button>
                  <button
                    onClick={handleCancel}
                    className='ml-2 text-gray-500 hover:underline'
                  >
                    CANCEL
                  </button>
                </>
              ) : (
                <>
                  <span>– {comment.text}</span>
                  <button 
                    className='ml-8'
                    onClick={() => handleEdit(comment)}
                  >
                    EDIT
                  </button>
                  <button 
                    className='ml-4'
                    onClick={() => deleteComment(todoId, comment.id)}
                  >
                    DELETE
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CommentBox
