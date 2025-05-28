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
        <div className='input-box flex items-center'>
          <textarea
            placeholder='Write a comment...'
            rows={3}
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className='border px-2 py-1 text-sm w-[300px] resize-none rounded'
          />
          <button
            onClick={handleAdd}
            className='bg-green-500 text-white text-sm ml-2 px-2 py-0.5 rounded hover:bg-green-600'
          >
            SUBMIT
          </button>
        </div>
      )}
      <div className='content-box'>
        <ul className='mt-4 text-sm text-gray-600 flex flex-col w-full'>
          {(comments[todoId] || []).map((comment) => (
            <li 
              key={comment.id}
              className='mb-2 w-full'
            >
              { editingId === comment.id ? (
                <>
                  <div className="flex justify-between items-center w-full">
                    <textarea
                      placeholder='Write a comment...'
                      value={editText}
                      rows={3}
                      onChange={(e) => setEditText(e.target.value)}
                      className='border px-2 py-1 text-sm w-[300px] resize-none rounded'
                    />
                    <div className='flex ml-2 gap-4'>
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
                    </div> 
                  </div>
                </>
              ) : (
                <>
                <div className='flex justify-between items-center mt-2 w-full'>
                    <span className="break-words max-w-md block">📝 {comment.text}</span>
                    <div className='flex ml-2 gap-4'>
                      <button 
                        onClick={() => handleEdit(comment)} 
                      >
                        EDIT
                      </button>
                      <button 
                        onClick={() => deleteComment(todoId, comment.id)}
                      >
                        DELETE
                      </button>
                    </div>    
                </div>  
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
