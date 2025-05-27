import React, { useState } from 'react'
import useTodoStore from '../store/todoStore'

function TodoInput() {
  const [input, setInput] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')

  const addTodo = useTodoStore((state) => state.addTodo)
  const toggleInput = useTodoStore((state) => state.toggleInput)

  const handleAdd = () => {
    if (input.trim() !== '') {
      addTodo(input, date, category)
      setInput('')
      setDate('')
      setCategory('')
      toggleInput()
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 z-50'>
      <div className='flex flex-col'>
        <div className='mt-40 flex justify-center items-center'>
          <input
            type='text'
            placeholder='What to do...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='border px-2 py-1 mr-2'
          />
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='border px-2 py-1 mr-2'
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='border px-2 py-1 rounded'
          >
            <option value="">Set Categories</option>
            <option value="TODAY">TODAY</option>
            <option value="THIS WEEK">THIS WEEK</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
        <div className='mt-6 flex justify-center items-center'>
          <button
        onClick={handleAdd}
        className='w-14 h-6 pb-px ml-2 bg-blue-800 rounded-full text-white hover:bg-blue-700'
      >
        ADD
      </button>
      <button
        onClick={toggleInput}
        className='w-20 h-6 pb-px ml-2 bg-blue-800 rounded-full text-white hover:bg-blue-700'
      >
        CANCEL
      </button>
        </div>
      </div>
    </div>
  )
}

export default TodoInput
