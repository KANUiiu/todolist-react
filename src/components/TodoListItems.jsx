import React, { useState } from 'react'
import useTodoStore from '../store/todoStore'
import useCommentStore from '../store/commentStore'
import CommentBox from './CommentBox'
import TodoItemContent from './TodoItemContent'

function TodoListItems({searchKeyword}) {
  const todoList = useTodoStore((state) => state.todoList)
  const toggleCompleted = useTodoStore((state) => state.toggleCompleted)
  const deleteTodo = useTodoStore((state) => state.deleteTodo)
  const updateTodo = useTodoStore((state) => state.updateTodo)
  const visibleComments = useCommentStore((state) => state.visibleComments)
  const toggleCommentBox = useCommentStore((state) => state.toggleCommentBox)
  
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editCategory, setEditCategory] = useState('')

  const startEditing = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
    setEditDate(todo.date)
    setEditCategory(todo.category)
  }

  const saveEdit = (id) => {
    updateTodo(id, editText, editDate, editCategory)
    setEditingId(null)
  }

  const filteredTodos = todoList.filter(todo =>
    todo.text.toLowerCase().includes(searchKeyword.toLowerCase())
  )

  return (
    <ul className='ml-2'>
      {filteredTodos.map((todo) => (
        <li className='mt-2' key={todo.id}>
          <input
            type='checkbox'
            checked={todo.completed}
            onChange={() => toggleCompleted(todo.id)}
          />
          
          <TodoItemContent
            todo={todo}
            isEditing={editingId === todo.id}
            editText={editText}
            editDate={editDate}
            editCategory={editCategory}
            setEditText={setEditText}
            setEditDate={setEditDate}
            setEditCategory={setEditCategory}
            startEditing={startEditing}
            saveEdit={saveEdit}
          />
          
          <button
            onClick={() => deleteTodo(todo.id)}
            className='w-20 h-6 pb-px ml-2 bg-rose-600 rounded-full text-white hover:bg-rose-500'
          >
            DELETE
          </button>

          <button
            onClick={() =>
              toggleCommentBox(todo.id)
            }
            className='w-24 h-6 pb-px ml-2 bg-cyan-600 rounded-full text-white hover:bg-cyan-500'
          >
            COMMENT
          </button>

          <CommentBox todoId={todo.id} showInput={visibleComments[todo.id]} />
        </li>
      ))}
    </ul>
  )
}

export default TodoListItems
