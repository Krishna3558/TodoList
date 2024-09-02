import { useEffect, useState } from 'react'
import { TodoProvider } from './context/todo'
import TodoForm from './components/TodoForm';
import Todoitem from './components/Todoitem';
import Toggle from './components/Toggle';
import { ThemeProvider } from './context/theme';

function App() {

  const [todos , setTodos] = useState([]);
  const [themeMode , setThemeMode] = useState("light");

  const darkMode = () => {
    setThemeMode("dark");
  }

  const lightMode = () => {
    setThemeMode("light");
  }

  useEffect(() => {
    document.querySelector('html').classList.remove("light" , "dark");
    document.querySelector('html').classList.add(themeMode);
  } , [themeMode])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now() , ...todo} , ...prev]);
  }

  const updateTodo = ( id , todo ) => {
    setTodos((prev) => prev.map((prevTodo) => (
      prevTodo.id === id ? todo : prevTodo
    )))
  }

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => (todo.id !== id)))
  }

  const complete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => 
      prevTodo.id === id ? {...prevTodo , completed : !prevTodo.completed} : prevTodo
    ))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if( todos && todos.length > 0 ){
      setTodos(todos);
    }
  } , [])

  useEffect(() => {
    localStorage.setItem("todos" , JSON.stringify(todos));
  } , [todos])

  return (
    <TodoProvider value = {{todos , addTodo , removeTodo , updateTodo , complete}}>
      <ThemeProvider value = {{themeMode , darkMode , lightMode}}>
      <div className=' h-screen w-full dark:bg-black'>
        <div className=' px-4 py-4'>
          <div className=' flex justify-around mt-6 mb-8 max-sm:mt-4 max-sm:mb-4'>
          <h1 className=' text-center capitalize font-semibold text-black dark:text-white text-2xl max-sm:text-lg max-[506px]:text-sm '>
            Create your todo list
          </h1>
          <div>
            <Toggle/>
          </div>
          </div>
          <div>
            <TodoForm/>
          </div>
          <div className=' mt-8 max-sm:mt-4'>
            {todos.map((todo) => (
              <div className='w-full' key={todo.id}>
                <Todoitem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      </ThemeProvider>
    </TodoProvider>
  )
}

export default App
