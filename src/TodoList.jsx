import React, { useState } from 'react'
import useTodoStore from './store/todoStore'
import TodoInput from './components/TodoInput'
import TodoListItems from './components/TodoListItems'


function TodoList() {
  const showInput = useTodoStore((state) => state.showInput) 
  const toggleInput = useTodoStore((state) => state.toggleInput)
  
  return (
    <div className='flex flex-col justify-start items-center min-h-screen pt-8 bg-gray-100'>
      <h1 className='text-5xl font-bold mb-8'>TODO LIST</h1>
      <div className='mb-4'>
        <button
          onClick={toggleInput}
          className='w-30 h-10 ml-2 bg-blue-800 rounded-full text-white hover:bg-blue-700 px-4 py-2'
        >
          NEW TASK
        </button>
      </div>

      {showInput && <TodoInput />}

      <TodoListItems />
    </div>
  )
}

export default TodoList
