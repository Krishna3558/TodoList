import React, { useState } from 'react'
import { useTodo } from '../context';

function Todoitem({todo}) {
  const [ todoMsg , setTodoMsg] = useState(todo.todo);
  const [ isEditable , setIsEditable ] = useState(false);
  const {updateTodo , removeTodo , complete} = useTodo();

  const update = () => {
    updateTodo(todo.id , {...todo , todo: todoMsg});
    setIsEditable(false);
  }

  const comp = () => {
    complete(todo.id);
  }
  return (
    <div className=' flex justify-center mb-2'>
    <div className={`flex border w-4/5 border-black/10 rounded-lg px-3 py-1.5 gap-x-3 duration-300 text-black dark:text-white ${todo.completed ? "bg-slate-50 dark:bg-gray-600" : "bg-slate-200 dark:bg-slate-800"}`}>
      <input
        type="checkbox"
        className='cursor-pointer'
        value={todo.completed}
        onChange={comp}
      />
      <input className={`border outline-none w-full bg-transparent rounded-lg ${isEditable ? "border-black/10 px-2" : "border-transparent"} ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => {setTodoMsg(e.target.value)}}
        readOnly={!isEditable}
      />
      <button onClick={() => {
        if (todo.completed) return;

        if(isEditable){
          update();
        }
        else{
          setIsEditable((prev) => (!prev));
        }
      }} disabled={todo.completed} className='inline-flex w-8 h-8 rounded-lg text-sm border-black/10 justify-center items-center bg-gray-50 dark:bg-slate-500 dark:hover:bg-slate-600  hover:bg-gray-100 shrink-0 disabled:opacity-50'>
        {isEditable ? "📁" : "✏️"}
      </button >
      <button onClick={() => {removeTodo(todo.id)}} className='inline-flex w-8 h-8 rounded-lg text-sm border-black/10 justify-center items-center bg-gray-50 dark:bg-slate-500 dark:hover:bg-slate-600 hover:bg-gray-100 shrink-0'>
        ❌
      </button>
    </div>
    </div>
  )
}

export default Todoitem