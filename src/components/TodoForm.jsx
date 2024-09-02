import React, { useState } from 'react'
import { useTodo } from '../context';

function TodoForm() {
  const [todo , setTodo] = useState('');
  const {addTodo} = useTodo();

  const add = (e) => {
    e.preventDefault();

    if(!todo) return

    addTodo({todo , completed: false})
    setTodo('');
  }

  return (
    <form onSubmit={add} className='flex justify-center'>
        <input
            type="text"
            placeholder="Write Todo...."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className=' w-3/5 bg-slate-200 dark:bg-gray-600 border-2 border-black/10 outline-none rounded-l-lg py-1 text-black dark:text-white px-2'
        />
        <button type="submit" className=' bg-green-600 hover:bg-green-700 active:bg-green-800 text-white border-2 border-black/10 rounded-r-lg py-1 px-2'>Add Todo</button>
    </form>
  )
}

export default TodoForm