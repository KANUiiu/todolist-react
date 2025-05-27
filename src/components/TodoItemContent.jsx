import React from 'react'

function TodoItemContent({
  todo,
  isEditing,
  editText,
  editDate,
  editCategory,
  setEditText,
  setEditDate,
  setEditCategory,
  startEditing,
  saveEdit
}) {
  return isEditing ? (
    <>
      <input
        type='text'
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className='ml-2 border px-1'
      />
      <input
        type='date'
        value={editDate}
        onChange={(e) => setEditDate(e.target.value)}
        className='ml-2 border px-1'
      />
      <select
        value={editCategory}
        onChange={(e) => setEditCategory(e.target.value)}
        className='ml-2 border px-1'
      >
        <option value="">CATEGORIES...</option>
        <option value="TODAY">TODAY</option>
        <option value="THIS WEEK">THIS WEEK</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>
      <button
        onClick={() => saveEdit(todo.id)}
        className='w-20 h-6 pb-px ml-2 bg-green-600 rounded-full text-white hover:bg-green-500'
      >
        SAVE
      </button>
    </>
  ) : (
    <>
      <span className={`ml-2 text-2xl ${todo.completed ? 'line-through' : ''}`}>
        {todo.text}
      </span>
      <span className='ml-2 text-base text-gray-500'>{todo.date}</span>
      <span className='ml-2 text-base text-gray-400'>{todo.completed ? 'COMPLETED' : todo.category}</span>
      <button
        onClick={() => startEditing(todo)}
        className='w-20 h-6 pb-px ml-2 bg-yellow-600 rounded-full text-white hover:bg-yellow-500'
      >
        EDIT
      </button>
    </>
  )
}

export default TodoItemContent
