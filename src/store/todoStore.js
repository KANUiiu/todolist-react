import { create } from 'zustand'

const useTodoStore = create((set, get) => ({
  todoList: [],
  addTodo: (text, date, category) =>
    set((state) => ({
      todoList: [
        ...state.todoList,
        {
          id: state.todoList.length + 1,
          text,
          date,
          category,
          completed: false,
        },
      ],
    })),
  toggleCompleted: (id) =>
    set((state) => ({
      todoList: state.todoList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todoList: state.todoList.filter((todo) => todo.id !== id),
    })),
  updateTodo: (id, newText, newDate, newCategory) =>
    set((state) => ({
        todoList: state.todoList.map((todo) =>
        todo.id === id
            ? {
                ...todo,
                text: newText,
                date: newDate,
                category: newCategory,
            }
            : todo
    ),
  })),

  showInput: false,
  toggleInput: () =>
    set((state) => ({
      showInput: !state.showInput,
    })),
}))

export default useTodoStore
